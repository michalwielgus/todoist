import React, { useState } from 'react';
import { FaPizzaSlice } from 'react-icons/fa';
import { AddTask } from '../AddTask';

export const Header = ({ darkMode, setDarkMode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="images/logo.png" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li className="settings__add">
              <button
                data-testid="quick-add-task-action"
                aria-label="Quick Add task"
                tabIndex={0}
                onClick={() => {
                  setShouldShowMain(true);
                  setShowQuickAddTask(true);
                }}
                onKeyPress={() => {
                  setShouldShowMain(true);
                  setShowQuickAddTask(true);
                }}
              >
                +
              </button>
            </li>
            <li className="settings__darkmode">
              <button
                aria-label="Switch Dark Mode"
                onClick={() => setDarkMode(!darkMode)}
                onKeyPress={() => setDarkMode(!darkMode)}
                tabIndex={0}
                data-testid="dark-mode-action"
              >
                <FaPizzaSlice />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        setShouldShowMain={setShouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  );
};
