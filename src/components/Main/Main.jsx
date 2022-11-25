import React, { useEffect, useState } from 'react';
import Button from 'kromac-ui-18/dist/Button';
import Challenge from '../Challenge';
import Grid from 'kromac-ui-18/dist/Grid';
import GridItem from 'kromac-ui-18/dist/GridItem';
import Input from '../Input';
import IntermediateCitiesList from '../IntermediateCitiesList';
import moment from 'moment/moment';
import Panel from 'kromac-ui-18/dist/Panel';
import SelectSearchable from '../SelectSearchable';
import Toast from 'kromac-ui-18/dist/Toast';
import { findCities } from '../../api';
import { isEmpty, areThereDuplicatedItems, isValidCity } from '../../utils';
import { useHistory } from 'react-router-dom';
import './Main.style.scss';

const Main = () => {
  const [listCities, setListCities] = useState([]);
  const [isListCitiesError, setIsListCitiesError] = useState(null);
  const [trip, setTrip] = useState({});

  const [txtOriginCity, setTxtOriginCity] = useState('');
  const [txtDestinationCity, setTxtDestinationCity] = useState('');
  const [txtIntermediateCity, setTxtIntermediateCity] = useState('');

  const [txtNroPassengers, setTxtNroPassengers] = useState(0);
  const [isNroPassengersError, setIsNroPassengersError] = useState(null);

  const [tripDate, setTripDate] = useState(null);
  const [isTripDateError, setIsTripDateError] = useState(null);

  const [intermediateList, setIntermediateList] = useState([]);
  const [showIntermediateSelect, setShowIntermediateSelect] = useState(false);

  const [isLoading, setIsloading] = useState(false);

  const [validateForm, setValidateForm] = useState(false);

  const history = useHistory();

  const tomorrow = new Date(moment().add(1, 'days'));

  useEffect(() => {
    (async () => {
      setIsloading(true);
      await setTimeout(() => {
        try {
          setListCities(
            findCities(
              txtOriginCity || txtDestinationCity || txtIntermediateCity
            )
          );
        } catch (error) {
          setIsListCitiesError('Error trying to retrieve the cities list.');
          setListCities([]);
        }
        setIsloading(false);
      }, 1000);
    })();
  }, [txtOriginCity, txtDestinationCity, txtIntermediateCity]);

  useEffect(() => {
    if (
      !isEmpty(trip?.originCity?.name) &&
      !trip?.originCity?.error &&
      !isEmpty(trip?.destinationCity?.name) &&
      !trip?.destinationCity?.error &&
      txtNroPassengers > 0 &&
      !isEmpty(tripDate?.toString() || '') &&
      !intermediateList.some((city) => city.error)
    ) {
      setValidateForm(true);
      setIsNroPassengersError(null);
      setIsTripDateError(null);
    }
  }, [trip, txtNroPassengers, tripDate, intermediateList]);

  const handlerSelectCity = (city, value) => {
    if (areThereDuplicatedItems(trip, city, value)) {
      setTrip({
        ...trip,
        [value]: {
          ...city,
          error: 'Duplicated city, please select another one.',
        },
      });
      setValidateForm(false);
    } else {
      setTrip({
        ...trip,
        [value]: { ...city, error: null },
      });
    }
    setTxtOriginCity('');
    setTxtDestinationCity('');
  };

  const handlerSelectIntermediateCity = (city, value) => {
    if (areThereDuplicatedItems(trip, city, value, intermediateList)) {
      setIntermediateList([...intermediateList, { ...city, error: true }]);
      setValidateForm(false);
    } else {
      setIntermediateList([...intermediateList, city]);
    }
    setTxtIntermediateCity('');
  };

  const handlerChangeInput = (e, value, setInput) => {
    setTrip({
      ...trip,
      [value]: {},
    });
    setInput(e.target.value);
  };

  const handleDeleteIntermediatecity = (id) => {
    setIntermediateList(intermediateList.filter((_, index) => index !== id));
  };

  const calculateTrip = (e) => {
    e.preventDefault();
    if (!isValidCity(trip, 'originCity', setTrip)) {
      setValidateForm(false);
    }
    if (!isValidCity(trip, 'destinationCity', setTrip)) {
      setValidateForm(false);
    }

    if (txtNroPassengers <= 0) {
      setIsNroPassengersError('This field must be greater than 0');
      setValidateForm(false);
      return;
    }
    if (isEmpty(tripDate?.toString() || '')) {
      setIsTripDateError('Please select a date to trip');
      setValidateForm(false);
      return;
    }
    const allCities = [
      trip.originCity,
      ...intermediateList,
      trip.destinationCity,
    ];

    history.push({
      pathname: `/result`,
      search: `?trip=${JSON.stringify(allCities)}&tripDate=${JSON.stringify(
        tripDate
      )}&passengers=${txtNroPassengers}`,
    });
  };

  return (
    <div className="main container">
      <Grid>
        <GridItem clg={2} cmd={4} csm={4} cxs={4}>
          <Panel className="kromac-scroll fixed">
            <form onSubmit={calculateTrip}>
              <section className="grouper">
                <Input
                  type="datepicker"
                  inputLabel="Date of the trip"
                  minDate={tomorrow}
                  selected={tripDate}
                  onChange={(date) => setTripDate(date)}
                  error={isTripDateError}
                />
                <Input
                  type="number"
                  inputLabel="Number of passengers"
                  value={txtNroPassengers}
                  min={1}
                  onChange={(e) =>
                    setTxtNroPassengers(parseInt(e.target.value))
                  }
                  error={isNroPassengersError}
                />
              </section>
              <section className="grouper">
                <SelectSearchable
                  inputLabel="City of origin"
                  value={trip?.originCity?.name || txtOriginCity}
                  onChangeInput={(e) =>
                    handlerChangeInput(e, 'originCity', setTxtOriginCity)
                  }
                  data={listCities}
                  isLoading={isLoading}
                  onSelectItem={(city) => handlerSelectCity(city, 'originCity')}
                  error={trip?.originCity?.error}
                />
                <SelectSearchable
                  inputLabel="City of destination"
                  value={trip?.destinationCity?.name || txtDestinationCity}
                  onChangeInput={(e) =>
                    handlerChangeInput(
                      e,
                      'destinationCity',
                      setTxtDestinationCity
                    )
                  }
                  data={listCities}
                  isLoading={isLoading}
                  disabled={!trip?.originCity?.name}
                  onSelectItem={(city) =>
                    handlerSelectCity(city, 'destinationCity')
                  }
                  error={trip?.destinationCity?.error}
                />
              </section>
              <section>
                {showIntermediateSelect ? (
                  <>
                    <SelectSearchable
                      inputLabel="Intermediate City"
                      value={txtIntermediateCity}
                      onChangeInput={(e) => {
                        setTxtIntermediateCity(e.target.value);
                      }}
                      data={listCities}
                      isLoading={isLoading}
                      disabled={!trip?.destinationCity?.name}
                      onSelectItem={(city) =>
                        handlerSelectIntermediateCity(city, 'intermediateCity')
                      }
                    />
                    <IntermediateCitiesList
                      label="Intermediates cities list"
                      list={intermediateList}
                      handlerDelete={handleDeleteIntermediatecity}
                    />
                  </>
                ) : (
                  <Button onClick={() => setShowIntermediateSelect(true)}>
                    Add intermediate(s) city
                  </Button>
                )}
              </section>
              <Button disabled={!validateForm} color="success">
                Calculate
              </Button>
            </form>
          </Panel>
        </GridItem>
        <GridItem clg={2} cmd={4} csm={4} cxs={4}>
          <Challenge />
        </GridItem>
      </Grid>
      <Toast
        message={isListCitiesError?.message}
        visible={isListCitiesError}
        timeOut={5000}
        color="error"
      />
    </div>
  );
};

export default Main;
