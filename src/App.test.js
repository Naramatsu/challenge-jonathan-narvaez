import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

describe('App Component', () => {
  const AppWrapped = () =>
    render(
      <>
        <Router>
          <App />
        </Router>
      </>
    );

  it('Should render the header section', () => {
    AppWrapped();
    const header = screen.getByText('Jc');
    expect(header).toBeInTheDocument();
  });

  it('Should render Jc Avatar', () => {
    AppWrapped();
    const jcAvatar = screen.getByText('Jc');
    expect(jcAvatar).toBeInTheDocument();
  });

  it('should render Personal information modal', () => {
    AppWrapped();
    const modal = screen.getByText('Personal information');
    expect(modal).toBeInTheDocument();
  });

  it('should add a classname to personal information modal', async () => {
    const { container } = AppWrapped();
    await userEvent.click(screen.getByText('Jc'));
    const modal = container.querySelector('.modal.hiden');
    expect(modal).not.toBeInTheDocument();
    await userEvent.click(container.querySelector('.App'));
    const modalHidden = container.querySelector('.modal.hidden');
    expect(modalHidden).toBeInTheDocument();
  });
});
