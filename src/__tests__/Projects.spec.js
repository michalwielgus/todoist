import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Projects } from '../components/Projects';

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
  })),
}));

describe('<ProjectOverlay', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Success', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it('renders the projects', () => {
      const { queryByTestId } = render(<Projects />);

      expect(queryByTestId('project-action')).toBeTruthy();
    });

    it('renders the projects and select an active project onClick', () => {
      const { queryByTestId } = render(<Projects activeValue="1" />);

      expect(queryByTestId('project-action')).toBeTruthy();

      fireEvent.click(queryByTestId('project-action'));
      expect(
        queryByTestId('project-action-parent').classList.contains('active')
      ).toBeTruthy();
    });

    it('renders the projects and select an active project onClick', () => {
      const { queryByTestId } = render(<Projects activeValue="1" />);

      expect(queryByTestId('project-action')).toBeTruthy();

      fireEvent.keyPress(queryByTestId('project-action'), {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });
      expect(
        queryByTestId('project-action-parent').classList.contains('active')
      ).toBeTruthy();
    });

    it('renders the projects with no active value onClick', () => {
      const { queryByTestId } = render(<Projects activeValue="1" />);

      expect(queryByTestId('project-action')).toBeTruthy();

      fireEvent.click(queryByTestId('project-action'));
      expect(
        queryByTestId('project-action-parent').classList.contains(
          'sidebar__project'
        )
      ).toBeTruthy();
    });
  });
});
