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
          <img src="todoist/images/logo.png" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li
              className="settings__add"
              data-testid="quick-add-task-action"
              onClick={() => {
                setShouldShowMain(true);
                setShowQuickAddTask(true);
              }}
            >
              +
            </li>
            <li
              className="settings_darkmode"
              data-testid="dark-mode-action"
              onClick={() => setDarkMode(!darkMode)}
            >
              <FaPizzaSlice />
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
