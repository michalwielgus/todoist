import React from 'react';
import moment from 'moment';
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) =>
  showTaskDate && (
    <div className="task-date" data-testid="task-date-overlay">
      <ul className="task-date__list">
        <li
          aria-label="Select today as the task date"
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(moment().format('DD/MM/YYYY'));
          }}
          onKeyDown={() => {
            setShowTaskDate(false);
            setTaskDate(moment().format('DD/MM/YYYY'));
          }}
          role="button"
          tabIndex={0}
          data-testid="task-date-today"
        >
          <span>
            <FaSpaceShuttle />
          </span>
          <span>Today</span>
        </li>
        <li
          aria-label="Select tomorrow as the task date"
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
          }}
          onKeyDown={() => {
            setShowTaskDate(false);
            setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
          }}
          role="button"
          tabIndex={0}
          data-testid="task-date-tomorrow"
        >
          <span>
            <FaSun />
          </span>
          <span>Tomorrow</span>
        </li>
        <li
          aria-label="Select next week as the task date"
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
          }}
          onKeyDown={() => {
            setShowTaskDate(false);
            setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
          }}
          role="button"
          tabIndex={0}
          data-testid="task-date-next-week"
        >
          <span>
            <FaRegPaperPlane />
          </span>
          <span>Next week</span>
        </li>
      </ul>
    </div>
  );
