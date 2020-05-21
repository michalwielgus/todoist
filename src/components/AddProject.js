import React, { useState } from 'react';
import { firebase } from '../firebase';
import { generatePushId } from '../helpers';
import { useProjectsValue } from '../context';

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');
  const projectId = generatePushId();
  const { setProjects } = useProjectsValue();

  const addProject = () => {
    projectName &&
      firebase
        .firestore()
        .collection('projects')
        .add({
          projectId,
          name: projectName,
          userId: 'wYWnnB6TG9oEdcuq',
        })
        .then(() => {
          setProjects([]);
          setProjectName('');
          setShow('false');
        });
  };

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input" data-testid="add-project-inner">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project__name"
            data-testid="project-name"
            type="text"
            placeholder="Name your project"
          />
          <button
            aria-label="Add Project"
            tabIndex={0}
            className="add-project__submit"
            type="button"
            onClick={() => addProject()}
            onKeyPress={() => addProject()}
            data-testid="add-project-submit"
          >
            Add project
          </button>
          <span
            aria-label="Cancel adding project"
            role="button"
            tabIndex={0}
            className="add-project__cancel"
            data-testid="hide-project-overlay"
            onClick={() => setShow(false)}
            onKeyPress={() => setShow(false)}
          >
            Cancel
          </span>
        </div>
      )}
      <div
        aria-label="Add project"
        role="button"
        tabIndex={0}
        className="add-project__show"
        data-testid="add-project-action"
        onClick={() => setShow(!show)}
        onKeyPress={() => setShow(!show)}
      >
        <span className="add-project__plus">+</span>
        <span className="add-project__text">Add Project</span>
      </div>
    </div>
  );
};
