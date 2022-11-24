import { render, screen } from '@testing-library/react';
import IntermediateCitiesList from './IntermediateCitiesList';

describe('IntermediateCitiesList Component', () => {
  const IntermediateCitiesListWrapped = (props) =>
    render(<IntermediateCitiesList {...props} />);

  describe('Intermediate city when is selecting', () => {
    const props = {
      label: 'Intermediate City',
      handlerDelete: jest.fn(),
      list: [
        { name: 'Paris', latitude: 48.856614, longitude: 2.352222 },
        { name: 'Marseille', latitude: 43.296482, longitude: 5.36978 },
      ],
    };

    it('Should render a label', () => {
      IntermediateCitiesListWrapped(props);
      const label = screen.getByText(/Intermediate City/i);
      expect(label).toBeInTheDocument();
    });

    it('Should render a distance', () => {
      props.distanceList = ['1.0'];
      IntermediateCitiesListWrapped(props);
      const distanceItem = screen.getByText(/1.0/i);
      expect(distanceItem).toBeInTheDocument();
    });

    it('Should render a chip without deleteIcon', () => {
      props.handlerDelete = null;
      props.label = undefined;
      IntermediateCitiesListWrapped(props);
      const chip = screen.getByText(/Paris/i);
      expect(chip).toBeInTheDocument();
    });
  });
});
