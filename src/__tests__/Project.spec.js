import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Project } from '../components/Project';

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
        doc: jest.fn(() => ({
          delete: jest.fn(() => Promise.resolve('Never mock firebase!')),
          update: jest.fn(),
        })),
      })),
    })),
  },
}));

describe('<Project />', () => {
  const project = {
    name: '🙌 Test',
    projectId: '1',
    userId: 'Elson',
    docId: 'kkk',
  };

  it('renders project', () => {
    const { getByText } = render(<Project project={project} />);
    expect(getByText('🙌 Test')).toBeTruthy();
  });

  it('renders the delete overlay and then delete project onClick', () => {
    const { queryByTestId, getByText } = render(<Project project={project} />);

    fireEvent.click(queryByTestId('delete-project'));
    expect(
      getByText('Are you sure you want to delete this project?')
    ).toBeTruthy();

    fireEvent.click(getByText('Delete'));
  });

  it('renders the delete overlay and then delete project onKeyPress', () => {
    const { queryByTestId, getByText } = render(<Project project={project} />);

    fireEvent.keyPress(queryByTestId('delete-project'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(
      getByText('Are you sure you want to delete this project?')
    ).toBeTruthy();

    fireEvent.keyPress(getByText('Delete'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
  });
  it('renders the delete overlay and then cancel deletion onClick', () => {
    const { queryByTestId, getByText } = render(<Project project={project} />);

    fireEvent.click(queryByTestId('delete-project'));
    expect(
      getByText('Are you sure you want to delete this project?')
    ).toBeTruthy();

    fireEvent.click(getByText('Cancel'));
  });

  it('renders the delete overlay and then delete project onKeyPress', () => {
    const { queryByTestId, getByText } = render(<Project project={project} />);

    fireEvent.keyPress(queryByTestId('delete-project'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(
      getByText('Are you sure you want to delete this project?')
    ).toBeTruthy();

    fireEvent.keyPress(getByText('Cancel'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
  });
});
