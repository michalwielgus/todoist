import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddTask } from '../components/AddTask';
import { useSelectedProjectValue } from '../context';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: '1' })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
}));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('Never mock firebase')),
      })),
    })),
  },
}));

describe('<AddTask />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Success', () => {
    it('renders the <AddTask /> component', () => {
      const { queryByTestId } = render(<AddTask />);
      expect(queryByTestId('add-task-comp')).toBeTruthy();
    });

    it('renders the <AddTask /> quick overlay', () => {
      const setShowQuickAddTask = jest.fn();

      const { queryByTestId } = render(
        <AddTask
          showAddTaskMain
          showShouldMain={false}
          showQuickAddTask
          setShowQuickAddTask
        />
      );
      expect(queryByTestId('quick-add-task')).toBeTruthy();
    });

    it('renders the <AddTask /> main showable onClick', () => {
      const { queryByTestId } = render(<AddTask />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();
    });

    it('renders the <AddTask /> main showable onKeyPress', () => {
      const { queryByTestId } = render(<AddTask />);

      fireEvent.keyPress(queryByTestId('show-main-action'), {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();
    });

    it('renders the <AddTask /> project overlay onClick', () => {
      const { queryByTestId } = render(<AddTask />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('show-project-overlay'));
      expect(queryByTestId('project-overlay')).toBeTruthy();
    });

    it('renders the <AddTask /> project overlay onClick', () => {
      const { queryByTestId } = render(<AddTask />);

      fireEvent.keyPress(queryByTestId('show-main-action'), {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyPress(queryByTestId('show-project-overlay'), {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });
      expect(queryByTestId('project-overlay')).toBeTruthy();
    });

    it('renders the <AddTask /> task date overlay onClick', () => {
      const { queryByTestId } = render(<AddTask />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('show-task-date-overlay'));
      expect(queryByTestId('task-date-overlay')).toBeTruthy();
    });

    it('renders the <AddTask /> task date overlay onKeyPress', () => {
      const { queryByTestId } = render(<AddTask />);

      fireEvent.keyPress(queryByTestId('show-main-action'), {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyPress(queryByTestId('show-task-date-overlay'), {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });
      expect(queryByTestId('task-date-overlay')).toBeTruthy();
    });

    it('hides the <AddTask /> main when onClick', () => {
      const { queryByTestId } = render(<AddTask />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('add-task-main-cancel'));
      expect(queryByTestId('add-task-main')).toBeFalsy();
    });

    it('hides the <AddTask /> main when onKeyPress', () => {
      const { queryByTestId } = render(<AddTask />);

      fireEvent.keyPress(queryByTestId('show-main-action'), {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyPress(queryByTestId('add-task-main-cancel'), {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });
      expect(queryByTestId('add-task-main')).toBeFalsy();
    });

    it('renders <AddTask /> for quick add task and then cancels onClick', () => {
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const showQuickAddTask = true;
      const { queryByTestId } = render(
        <AddTask showQuickAddTask setShowQuickAddTask={setShowQuickAddTask} />
      );

      expect(queryByTestId('add-task-main')).toBeTruthy();
      fireEvent.click(queryByTestId('add-task-quick-cancel'));

      expect(setShowQuickAddTask).toHaveBeenCalled();
      //  expect(showQuickAddTask).toBeFalsy();
    });

    it('renders <AddTask /> for quick add task and then cancels onKeyPress', () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask showQuickAddTask setShowQuickAddTask={setShowQuickAddTask} />
      );

      expect(queryByTestId('add-task-main')).toBeTruthy();
      fireEvent.keyPress(queryByTestId('add-task-quick-cancel'), {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });

      expect(setShowQuickAddTask).toHaveBeenCalled();
      //expect(showQuickAddTask).toBeFalsy();
    });

    it('renders <AddTask /> and add task from quick add to the inbox onClick and clears state', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'INBOX',
      }));

      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-content')).toBeTruthy();

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'This is a new task' },
      });
      expect(queryByTestId('add-task-content').value).toBe(
        'This is a new task'
      );

      fireEvent.click(queryByTestId('add-task'));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it('renders <AddTask /> and add task from quick add to the inbox onKeyPress and clears state', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'INBOX',
      }));

      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );

      fireEvent.keyPress(queryByTestId('show-main-action'), {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });
      expect(queryByTestId('add-task-content')).toBeTruthy();

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'This is a new task' },
      });
      expect(queryByTestId('add-task-content').value).toBe(
        'This is a new task'
      );

      fireEvent.keyPress(queryByTestId('add-task'), {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });
  });

  it('renders <AddTask /> and add task from quick add to the inbox onClick and clears state', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'INBOX',
    }));

    const showQuickAddTask = true;
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
    const { queryByTestId } = render(
      <AddTask
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    );

    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-content')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'This is a new task' },
    });
    expect(queryByTestId('add-task-content').value).toBe('This is a new task');

    fireEvent.click(queryByTestId('add-task'));
    expect(setShowQuickAddTask).toHaveBeenCalled();
  });

  it('renders <AddTask /> and add task from quick add to the inbox onClick and clears state', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'INBOX',
    }));

    const showShouldMain = false;
    const showQuickAddTask = false;
    const showMain = true;
    const setShowMain = jest.fn(() => !showMain);
    const { queryByTestId } = render(
      <AddTask
        showShouldMain={showShouldMain}
        setShowMain={setShowMain}
        showQuickAddTask={showQuickAddTask}
      />
    );

    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-content')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'This is a new task' },
    });
    expect(queryByTestId('add-task-content').value).toBe('This is a new task');

    fireEvent.click(queryByTestId('add-task'));
    //expect(setShowMain).toHaveBeenCalled();
  });

  it('renders <AddTask /> and add task from quick add to the inbox onClick and clears state', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'INBOX',
    }));

    const showShouldMain = false;
    const showQuickAddTask = false;
    const showMain = true;
    const setShowMain = jest.fn(() => !showMain);
    const { queryByTestId } = render(
      <AddTask
        showShouldMain={showShouldMain}
        setShowMain={setShowMain}
        showQuickAddTask={showQuickAddTask}
      />
    );

    fireEvent.keyPress(queryByTestId('show-main-action'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('add-task-content')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'This is a new task' },
    });
    expect(queryByTestId('add-task-content').value).toBe('This is a new task');

    fireEvent.keyPress(queryByTestId('add-task'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    //expect(setShowMain).toHaveBeenCalled();
  });

  it('reners <AddTask /> and add a task with a task date of TODAY onClick', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
    }));

    const { queryByTestId } = render(<AddTask />);

    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-content')).toBeTruthy();
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'This is a new task with date' },
    });
    expect(queryByTestId('add-task-content').value).toBe(
      'This is a new task with date'
    );

    fireEvent.click(queryByTestId('show-task-date-overlay'));
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.click(queryByTestId('task-date-today'));
    expect(queryByTestId('task-date-overlay')).toBeFalsy();

    fireEvent.click(queryByTestId('add-task'));
  });

  it('reners <AddTask /> and add a task with a task date of TODAY onKeyPress', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
    }));

    const { queryByTestId } = render(<AddTask />);

    fireEvent.keyPress(queryByTestId('show-main-action'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('add-task-content')).toBeTruthy();
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'This is a new task with date' },
    });
    expect(queryByTestId('add-task-content').value).toBe(
      'This is a new task with date'
    );

    fireEvent.keyPress(queryByTestId('show-task-date-overlay'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.keyPress(queryByTestId('task-date-today'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('task-date-overlay')).toBeFalsy();
  });

  it('reners <AddTask /> and add a task with a task date of TOMORROW onClick', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
    }));

    const { queryByTestId } = render(<AddTask />);

    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-content')).toBeTruthy();
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'This is a new task with date' },
    });
    expect(queryByTestId('add-task-content').value).toBe(
      'This is a new task with date'
    );

    fireEvent.click(queryByTestId('show-task-date-overlay'));
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.click(queryByTestId('task-date-tomorrow'));
    expect(queryByTestId('task-date-overlay')).toBeFalsy();

    fireEvent.click(queryByTestId('add-task'));
  });

  it('reners <AddTask /> and add a task with a task date of TOMORROW onKeyPress', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
    }));

    const { queryByTestId } = render(<AddTask />);

    fireEvent.keyPress(queryByTestId('show-main-action'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('add-task-content')).toBeTruthy();
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'This is a new task with date' },
    });
    expect(queryByTestId('add-task-content').value).toBe(
      'This is a new task with date'
    );

    fireEvent.keyPress(queryByTestId('show-task-date-overlay'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.keyPress(queryByTestId('task-date-tomorrow'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('task-date-overlay')).toBeFalsy();
  });

  it('reners <AddTask /> and add a task with a task date of NEXT_7 onClick', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
    }));

    const { queryByTestId } = render(<AddTask />);

    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-content')).toBeTruthy();
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'This is a new task with date' },
    });
    expect(queryByTestId('add-task-content').value).toBe(
      'This is a new task with date'
    );

    fireEvent.click(queryByTestId('show-task-date-overlay'));
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.click(queryByTestId('task-date-next-week'));
    expect(queryByTestId('task-date-overlay')).toBeFalsy();

    fireEvent.click(queryByTestId('add-task'));
  });

  it('reners <AddTask /> and add a task with a task date of NEXT_7 onKeyPress', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
    }));

    const { queryByTestId } = render(<AddTask />);

    fireEvent.keyPress(queryByTestId('show-main-action'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('add-task-content')).toBeTruthy();
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'This is a new task with date' },
    });
    expect(queryByTestId('add-task-content').value).toBe(
      'This is a new task with date'
    );

    fireEvent.keyPress(queryByTestId('show-task-date-overlay'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.keyPress(queryByTestId('task-date-next-week'), {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(queryByTestId('task-date-overlay')).toBeFalsy();
  });
});
