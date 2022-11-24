import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment/moment';
import Input from './Input';

describe('Input component', () => {
  const setup = (props) => render(<Input {...props} />);

  describe('Should render a datepicker', () => {
    const props = {
      inputLabel: 'Date of the trip',
      type: 'datepicker',
      minDate: new Date(moment().add(1, 'days')),
      onChange: jest.fn(),
      selected: null,
    };

    it('Should render datepicker input label', () => {
      setup(props);
      const datePicker = screen.getByText('Date of the trip:');
      expect(datePicker).toBeInTheDocument();
    });

    it('Should render datepicker schedule', async () => {
      const { container } = setup(props);
      await userEvent.click(
        screen.getByPlaceholderText('Pick a date to travel')
      );
      const datepicker = container.querySelector('.react-datepicker-popper');
      expect(datepicker).toBeInTheDocument();
    });

    it('Should pick a date in datepicker', async () => {
      const { container } = setup(props);
      await userEvent.click(
        screen.getByPlaceholderText('Pick a date to travel')
      );
      await fireEvent.change(
        screen.getByPlaceholderText('Pick a date to travel'),
        { target: { value: new Date(moment().add(1, 'days')) } }
      );
      const datepicker = container.querySelector('.react-datepicker-popper');
      expect(datepicker).toBeInTheDocument();
    });

    it('Should render an error message using datepicker', () => {
      setup({ ...props, error: 'some error' });
      const message = screen.getByText('some error');
      expect(message).toBeInTheDocument();
    });
  });

  describe('Should render a input text', () => {
    cleanup();
    const props = {
      inputLabel: 'Number of passengers',
      value: null,
      onChange: jest.fn(),
    };

    it('Should render an input', () => {
      setup(props);
      const inputLabel = screen.getByText(/Number of passengers/i);
      expect(inputLabel).toBeInTheDocument();
    });
  });
});
