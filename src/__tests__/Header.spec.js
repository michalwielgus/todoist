import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Header } from '../components/layout/Header';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
}));

beforeEach(cleanup);

describe('<Header />', () => {
  it('renders the header compnent', () => {
    const { queryByTestId } = render(<Header />);
    expect(queryByTestId('header')).toBeTruthy();
  });

  it('renders the header compnent and activate darkmode onClick', () => {
    const darkMode = false;
    const setDarkMode = jest.fn(() => !darkMode);
    const { queryByTestId } = render(
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    );
    expect(queryByTestId('header')).toBeTruthy();

    fireEvent.click(queryByTestId('dark-mode-action'));
    expect(setDarkMode).toHaveBeenCalledWith(true);
  });

  it('renders the header compnent and activate darkmode onKeyPress', () => {
    const darkMode = false;
    const setDarkMode = jest.fn(() => !darkMode);
    const { queryByTestId } = render(
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    );
    expect(queryByTestId('header')).toBeTruthy();

    fireEvent.keyPress(queryByTestId('dark-mode-action'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(setDarkMode).toHaveBeenCalledWith(true);
  });

  it('renders the header compnent and set quick add task to true onClick', () => {
    const { queryByTestId } = render(<Header />);
    expect(queryByTestId('header')).toBeTruthy();

    fireEvent.click(queryByTestId('quick-add-task-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();
  });

  it('renders the header compnent and set quick add task to true onKeyPress', () => {
    const { queryByTestId } = render(<Header />);
    expect(queryByTestId('header')).toBeTruthy();

    fireEvent.keyPress(queryByTestId('quick-add-task-action'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('add-task-main')).toBeTruthy();
  });
});
