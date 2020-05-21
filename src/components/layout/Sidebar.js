import React, { useState } from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';

import { useSelectedProjectValue } from '../../context';
import { Projects } from '../Projects';
import { AddProject } from '../AddProject';

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          aria-label="Show Inbox"
          className={active === 'inbox' ? 'active' : undefined}
          data-testid="inbox"
          onClick={() => {
            setActive('inbox');
            setSelectedProject('INBOX');
          }}
          onKeyPress={() => {
            setActive('inbox');
            setSelectedProject('INBOX');
          }}
          role="button"
          tabIndex={0}
        >
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li
          aria-label="Show Today's tasks"
          className={active === 'today' ? 'active' : undefined}
          data-testid="today"
          onClick={() => {
            setActive('today');
            setSelectedProject('TODAY');
          }}
          onKeyPress={() => {
            setActive('today');
            setSelectedProject('TODAY');
          }}
          role="button"
          tabIndex={0}
        >
          <span>
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li
          aria-label="Show Tasks for the next week"
          className={active === 'next_7' ? 'active' : undefined}
          data-testid="next_7"
          onClick={() => {
            setActive('next_7');
            setSelectedProject('NEXT_7');
          }}
          onKeyPress={() => {
            setActive('next_7');
            setSelectedProject('NEXT_7');
          }}
          role="button"
          tabIndex={0}
        >
          <span>
            <FaRegCalendarAlt />
          </span>
          <span>Next 7 days</span>
        </li>
      </ul>
      <div
        className="sidebar__middle"
        onClick={() => setShowProjects(!showProjects)}
        onKeyPress={() => setShowProjects(!showProjects)}
        role="button"
        tabIndex={0}
      >
        <span>
          <FaChevronDown
            className={!showProjects ? 'hidden-projects' : undefined}
          />
        </span>
        <h2>Projects</h2>
      </div>
      {showProjects && (
        <ul className="sidebar__projects" data-testid="sidebar-projects">
          <Projects />
        </ul>
      )}
      <AddProject />
    </div>
  );
};
