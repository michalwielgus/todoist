import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Sidebar } from '../components/layout/Sidebar';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX'),
  })),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🙌 Test',
        projectId: '1',
        userId: 'Elson',
        docId: 'kkk',
      },
    ],
    setProjects: jest.fn(),
  })),
}));

beforeEach(cleanup);

describe('<Sidebar />', () => {
  it('renders the sidebar', () => {
    const { queryByTestId } = render(<Sidebar />);
    expect(queryByTestId('sidebar')).toBeTruthy();
  });

  it('changes the active project to Inbox in collated tasks onClick', () => {
    const { queryByTestId } = render(<Sidebar />);
    expect(queryByTestId('sidebar')).toBeTruthy();

    fireEvent.click(queryByTestId('inbox'));
    expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
    expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
    expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
  });

  it('changes the active project to Inbox in collated tasks onKeyPress', () => {
    const { queryByTestId } = render(<Sidebar />);
    expect(queryByTestId('sidebar')).toBeTruthy();

    fireEvent.keyPress(queryByTestId('inbox'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
    expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
    expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
  });

  it('changes the active project to Today in collated tasks onClick', () => {
    const { queryByTestId } = render(<Sidebar />);
    expect(queryByTestId('sidebar')).toBeTruthy();

    fireEvent.click(queryByTestId('today'));
    expect(queryByTestId('today').classList.contains('active')).toBeTruthy();
    expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
    expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
  });

  it('changes the active project to Today in collated tasks onKeyPress', () => {
    const { queryByTestId } = render(<Sidebar />);
    expect(queryByTestId('sidebar')).toBeTruthy();

    fireEvent.keyPress(queryByTestId('today'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('today').classList.contains('active')).toBeTruthy();
    expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
    expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
  });

  it('changes the active project to Next 7 days in collated tasks onClick', () => {
    const { queryByTestId } = render(<Sidebar />);
    expect(queryByTestId('sidebar')).toBeTruthy();

    fireEvent.click(queryByTestId('next_7'));
    expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy();
    expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
    expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
  });

  it('changes the active project to Next 7 days in collated tasks onKeyPress', () => {
    const { queryByTestId } = render(<Sidebar />);
    expect(queryByTestId('sidebar')).toBeTruthy();

    fireEvent.keyPress(queryByTestId('next_7'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy();
    expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
    expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
  });

  it('hides and shows the sidebar projects using onClick', () => {
    const { queryByTestId, getByText } = render(<Sidebar />);
    expect(queryByTestId('sidebar')).toBeTruthy();

    fireEvent.click(getByText('Projects'));
    expect(queryByTestId('sidebar-projects')).toBeFalsy();

    fireEvent.click(getByText('Projects'));
    expect(queryByTestId('sidebar-projects')).toBeTruthy();
  });

  it('hides and shows the sidebar projects onKeyPress', () => {
    const { queryByTestId, getByText } = render(<Sidebar />);
    expect(queryByTestId('sidebar')).toBeTruthy();

    fireEvent.keyPress(getByText('Projects'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('sidebar-projects')).toBeFalsy();

    fireEvent.keyPress(getByText('Projects'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('sidebar-projects')).toBeTruthy();
  });
});
