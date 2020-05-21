import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { firebase } from '../firebase';

export const Project = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docId) => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject('INBOX');
      });
  };

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        aria-label="Delete project"
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyPress={() => setShowConfirm(!showConfirm)}
        role="button"
        tabIndex={0}
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button
                aria-label="Confirm deletion of a project"
                type="button"
                onClick={() => deleteProject(project.docId)}
                onKeyPress={() => deleteProject(project.docId)}
                tabIndex={0}
              >
                Delete
              </button>
              <span
                data-testid="cancel-deletion"
                aria-label="Cancel deletion of a project"
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyPress={() => setShowConfirm(!showConfirm)}
                role="button"
                tabIndex={0}
              >
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};
