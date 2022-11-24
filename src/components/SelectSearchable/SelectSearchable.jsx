import React from 'react';
import classNames from 'classnames';
import './SelectSearchable.style.scss';

const SelectSearchable = ({
  inputLabel,
  value,
  onChangeInput,
  data,
  isLoading,
  onSelectItem,
  disabled,
  error = null,
}) => {
  const searchContainerClassName = classNames('search__container', {
    error: !!error,
    disabled: disabled,
  });

  const isEmpty = !data.length;

  return (
    <section className={searchContainerClassName}>
      <p>{inputLabel}:</p>
      <section className="search__section">
        <input
          type="text"
          value={value}
          onChange={onChangeInput}
          disabled={disabled}
          placeholder={inputLabel}
        />
        {error && <p className="alert">{error}</p>}
        <section
          className="search__section__list kromac-scroll"
          style={{ '--items': isLoading || !data.length ? 1 : data.length }}
        >
          <ul>
            {isLoading ? (
              <p>Loading cities...!</p>
            ) : (
              <>
                {!isEmpty ? (
                  data.map((city, index) => (
                    <li key={index} onClick={() => onSelectItem(city)}>
                      {city.name}
                    </li>
                  ))
                ) : (
                  <p style={{ cursor: 'not-allowed' }}>No cities found</p>
                )}
              </>
            )}
          </ul>
        </section>
      </section>
    </section>
  );
};

export default SelectSearchable;
