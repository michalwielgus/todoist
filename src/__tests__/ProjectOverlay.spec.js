import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { ProjectOverlay } from '../components/ProjectOverlay';
import { useProjectsValue } from '../context';

beforeEach(cleanup);

jest.mock('../context', () => ({
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
    it('renders the project overlay and calls setShowProjectOverlay using onClick', () => {
      const showProjectOverlay = true;
      const setProject = jest.fn();
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

      const { queryByTestId } = render(
        <ProjectOverlay
          showProjectOverlay
          setProject={setProject}
          setShowProjectOverlay={setShowProjectOverlay}
        />
      );

      expect(queryByTestId('project-overlay')).toBeTruthy();
      fireEvent.click(queryByTestId('project-overlay-action'));
      expect(setProject).toHaveBeenCalled();
    });
    it('renders the project overlay and calls setShowProjectOverlay using onKeyPress', () => {
      const showProjectOverlay = true;
      const setProject = jest.fn();
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

      const { queryByTestId } = render(
        <ProjectOverlay
          showProjectOverlay
          setProject={setProject}
          setShowProjectOverlay={setShowProjectOverlay}
        />
      );

      expect(queryByTestId('project-overlay')).toBeTruthy();
      fireEvent.keyPress(queryByTestId('project-overlay-action'), {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });
      expect(setProject).toHaveBeenCalled();
    });
  });

  describe('Failure', () => {
    it('does not render the project overlay with any projects', () => {
      useProjectsValue.mockImplementation(() => ({
        projects: [],
      }));

      const { queryByTestId } = render(<ProjectOverlay showProjectOverlay />);

      expect(queryByTestId('project-overlay')).toBeTruthy();
      expect(queryByTestId('project-overlay-action')).toBeFalsy();
    });
  });
});
