import React from 'react';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import Chip from '@mui/material/Chip';
import classNames from 'classnames';
import './IntermediateCitiesList.style.scss';

const IntermediateCitiesList = ({
  list,
  handlerDelete,
  label = '',
  distanceList = [],
}) => {
  const errorClassName = (value) => classNames({ error: value });

  return (
    <>
      <p>{label}</p>
      <section className="intermediate__list kromac-scroll">
        {list.map((city, index) => (
          <React.Fragment key={index}>
            <section className={errorClassName(city.error)}>
              {handlerDelete ? (
                <Chip label={city.name} onDelete={() => handlerDelete(index)} />
              ) : (
                <>
                  <Chip label={city.name} />
                </>
              )}
              {distanceList.length ? (
                index === 0 ? null : (
                  <p>{distanceList[index - 1]}Km</p>
                )
              ) : null}
            </section>
            <ArrowRightAlt className="arrowIcons" />
          </React.Fragment>
        ))}
      </section>
    </>
  );
};

export default IntermediateCitiesList;
