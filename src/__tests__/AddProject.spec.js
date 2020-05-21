import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { AddProject } from '../components/AddProject';

beforeEach(cleanup);

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

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('Resolved')),
      })),
    })),
  },
}));

beforeEach(cleanup);

describe('<AddProject />', () => {
  it('renders <AddProject />', () => {
    const { queryByTestId } = render(<AddProject shouldShow />);
    expect(queryByTestId('add-project-inner')).toBeTruthy();
  });

  it('renders <AddProject /> and add project', () => {
    const { queryByTestId } = render(<AddProject shouldShow />);
    expect(queryByTestId('add-project-inner')).toBeTruthy();

    fireEvent.change(queryByTestId('project-name'), {
      target: { value: 'Test project' },
    });
    expect(queryByTestId('project-name').value).toBe('Test project');

    fireEvent.click(queryByTestId('add-project-submit'));
    fireEvent.keyPress(queryByTestId('add-project-submit'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
  });

  it('hides the project overlay onClick cancel', () => {
    const { queryByTestId, getByText } = render(<AddProject shouldShow />);
    expect(queryByTestId('add-project-inner')).toBeTruthy();

    fireEvent.change(queryByTestId('project-name'), {
      target: { value: 'Test project' },
    });
    expect(queryByTestId('project-name').value).toBe('Test project');

    fireEvent.click(getByText('Cancel'));
    expect(queryByTestId('add-project-inner')).toBeFalsy();
  });

  it('hides the project overlay onKeyPress cancel', () => {
    const { queryByTestId, getByText } = render(<AddProject shouldShow />);
    expect(queryByTestId('add-project-inner')).toBeTruthy();

    fireEvent.change(queryByTestId('project-name'), {
      target: { value: 'Test project' },
    });
    expect(queryByTestId('project-name').value).toBe('Test project');

    fireEvent.keyPress(getByText('Cancel'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('add-project-inner')).toBeFalsy();
  });

  it('hides the project overlay using onClick singular and reverse action', () => {
    const { queryByTestId, getByText } = render(<AddProject shouldShow />);
    expect(queryByTestId('add-project-inner')).toBeTruthy();

    fireEvent.change(queryByTestId('project-name'), {
      target: { value: 'Test project' },
    });
    expect(queryByTestId('project-name').value).toBe('Test project');

    fireEvent.click(queryByTestId('add-project-action'));
    expect(queryByTestId('add-project-inner')).toBeFalsy();
  });

  it('hides the project overlay using onKeyPress singular and reverse action', () => {
    const { queryByTestId, getByText } = render(<AddProject shouldShow />);
    expect(queryByTestId('add-project-inner')).toBeTruthy();

    fireEvent.change(queryByTestId('project-name'), {
      target: { value: 'Test project' },
    });
    expect(queryByTestId('project-name').value).toBe('Test project');

    fireEvent.keyPress(queryByTestId('add-project-action'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('add-project-inner')).toBeFalsy();
  });
});
