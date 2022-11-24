import { render, screen, fireEvent } from '@testing-library/react';
import SelectSearchable from './SelectSearchable';

describe('SelectSearchable Component', () => {
  const IntermediateCitiesListWrapped = (props) =>
    render(<SelectSearchable {...props} />);

  describe('Should render a list', () => {
    const props = {
      inputLabel: 'City of origin',
      value: null,
      onChangeInput: jest.fn(),
      isLoading: false,
      onSelectItem: jest.fn(),
      disabled: false,
      error: null,
      data: [
        { name: 'Paris', latitude: 48.856614, longitude: 2.352222 },
        { name: 'Marseille', latitude: 43.296482, longitude: 5.36978 },
      ],
    };

    it('Should render a input', () => {
      IntermediateCitiesListWrapped(props);
      const input = screen.getByText(/City of origin/i);
      expect(input).toBeInTheDocument();
    });

    it('Should select a city', async () => {
      IntermediateCitiesListWrapped(props);
      const input = screen.getByPlaceholderText(/City of origin/i);
      await fireEvent.click(input);
      expect(input).toBeInTheDocument();
      const option = screen.getByText('Paris');
      await fireEvent.click(option);
      const selected = screen.getByText('Paris');
      expect(selected).toBeInTheDocument();
    });

    it('Should display an error', () => {
      props.error = 'some error';
      IntermediateCitiesListWrapped(props);
      const message = screen.getByText('some error');
      expect(message).toBeInTheDocument();
    });
  });
});
