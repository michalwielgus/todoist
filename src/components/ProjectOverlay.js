import React from 'react';
import { useProjectsValue } from '../context';

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
}) => {
  const { projects } = useProjectsValue();
  return (
    projects &&
    showProjectOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          {projects.map((project) => (
            <li
              data-testid="project-overlay-action"
              aria-label="Select the task project"
              key={project.projectId}
              onClick={() => {
                setProject(project.projectId);
                setShowProjectOverlay(false);
              }}
              onKeyPress={() => {
                setProject(project.projectId);
                setShowProjectOverlay(false);
              }}
              role="button"
              tabIndex={0}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};
