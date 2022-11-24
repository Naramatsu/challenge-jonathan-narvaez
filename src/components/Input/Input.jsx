import classNames from 'classnames';
import React from 'react';
import DatePickerTool from 'react-datepicker';

const Input = (props) => {
  const { inputLabel, onChange, error = null, type = 'text', ...rest } = props;
  const searchContainerClassName = classNames('search__container', {
    error: error,
  });

  return (
    <section className={searchContainerClassName}>
      <p>{inputLabel}:</p>
      <section className="search__section">
        {type === 'datepicker' ? (
          <DatePickerTool
            minDate={props.minDate}
            selected={props.selected}
            placeholderText="Pick a date to travel"
            onChange={(date) => onChange(date)}
          />
        ) : (
          <input
            type={type}
            value={props.value}
            onChange={onChange}
            required
            placeholder="how many people is in?"
            {...rest}
          />
        )}
      </section>
      {error && <p className="alert">{error}</p>}
    </section>
  );
};
export default Input;
