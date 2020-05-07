import React, { useState } from 'react';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { Project } from './Project';

export const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  return projects
    ? projects.map((project) => (
        <li
          key={project.projectId}
          data-doc-id={project.docId}
          data-testid="project-action"
          role="button"
          className={
            active === project.projectId
              ? 'active sidebar__project'
              : 'sidebar__project'
          }
        >
          <button
            aria-label={`Select ${project.name} as task project`}
            tabIndex={0}
            onKeyDown={() => {
              setActive(project.projectId);
              setSelectedProject(project.projectId);
            }}
            onClick={() => {
              setActive(project.projectId);
              setSelectedProject(project.projectId);
            }}
          >
            <Project project={project} />
          </button>
        </li>
      ))
    : 'No projects found';
};
