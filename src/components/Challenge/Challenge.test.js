import { render, screen } from '@testing-library/react';
import Challenge from './Challenge';

describe('Challenge component', () => {
  const setup = () => render(<Challenge />);

  it('Should render The Task tag', () => {
    setup();
    const h3 = screen.getByText('The Task');
    expect(h3).toBeInTheDocument();
  });

  it('Should render Technical Requirements tag', () => {
    setup();
    const h3 = screen.getByText('Technical Requirements');
    expect(h3).toBeInTheDocument();
  });
});
