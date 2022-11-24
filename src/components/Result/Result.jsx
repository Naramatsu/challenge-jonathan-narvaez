import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Panel from 'kromac-ui-18/dist/Panel';
import { calculateDistance } from '../../api';
import IntermediateCitiesList from '../IntermediateCitiesList';
import './Result.style.scss';
import Spinner from 'kromac-ui-18/dist/Spinner';
import UndoIcon from '@mui/icons-material/Undo';
import { formatDate } from '../../utils';

const calculatorTrip = (allCities) => {
  const result = [];

  for (let i = 0; i < allCities.length - 1; i++) {
    result.push(
      calculateDistance({
        lat1: allCities[i].latitude,
        lon1: allCities[i].longitude,
        city1: allCities[i].name,
        lat2: allCities[i + 1].latitude,
        lon2: allCities[i + 1].longitude,
        city2: allCities[i + 1].name,
      })
    );
  }

  return result;
};

const Result = () => {
  const history = useHistory();
  const route = history?.location?.search;
  const [calculation, setCalculation] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [tripDate, setTripDate] = useState(null);
  const [nroPassengers, setNroPassengers] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    (async () => {
      if (route && !allCities.length) {
        setIsloading(true);
        await setTimeout(() => {
          setAllCities(JSON.parse(queryString.parse(route).trip));
          setIsloading(false);
        }, 2000);
      }
    })();
  }, [route, allCities]);

  useEffect(() => {
    try {
      setNroPassengers(JSON.parse(queryString.parse(route).passengers));
    } catch (error) {
      setIsError(
        <h4>
          Ups, it seems that the number of passengers is missing, please fill
          out the form again.
        </h4>
      );
    }
    try {
      setTripDate(new Date(JSON.parse(queryString.parse(route).tripDate)));
    } catch (error) {
      setIsError(
        <h4>
          Ups, it seems that date of the trip is missing, please fill out the
          form again.
        </h4>
      );
    }
  }, [route]);

  useEffect(() => {
    if (allCities.length) {
      if (allCities.length < 2) {
        setIsError(
          <>
            <h4>
              Ups! Something went wrong, please pick a destination city, and try
              again.
            </h4>
            <p>You will be redirect to home page in 5 seconds.</p>
          </>
        );
        setTimeout(() => {
          history.push('/');
        }, 5000);
      }

      try {
        setCalculation(calculatorTrip(allCities));
      } catch (error) {
        setIsError(
          <h4>
            Ups! Something went wrong, please try again or check the data.
          </h4>
        );
      }
    }
  }, [allCities, history]);

  const totalDistance =
    (calculation.length &&
      calculation.reduce((a, b) =>
        (parseFloat(a) + parseFloat(b)).toFixed(2)
      )) ||
    0;

  return (
    <div className="container result">
      <Panel>
        <h3>Summary</h3>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {!isError ? (
              <>
                {tripDate && (
                  <p className="text__left">
                    <b>Trip date: </b>
                    {formatDate(tripDate)}
                  </p>
                )}
                {nroPassengers && (
                  <p className="text__left">
                    <b>Total passengers: </b>
                    {nroPassengers}
                  </p>
                )}
                <IntermediateCitiesList
                  list={allCities}
                  distanceList={calculation}
                />
                <br />
                {totalDistance && (
                  <>
                    <h5>Total distance</h5>
                    <p className="final__distance">{totalDistance}Kms</p>
                  </>
                )}
              </>
            ) : (
              isError
            )}
            <br />
            <Link to="/" className="btn__float">
              <UndoIcon fontSize="large" />
            </Link>
          </>
        )}
      </Panel>
    </div>
  );
};

export default Result;
