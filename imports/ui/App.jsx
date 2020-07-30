import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';  // hook used to render tasks
import _ from 'lodash'
import { Task } from './Task'
import { Tasks } from '../api/tasks'
import { TaskForm } from './TaskForm'
import { LoginForm } from './LoginForm'

const toggleChecked = ({ _id, isChecked }) => {  //Toggle checkbox
  Meteor.call('tasks.setChecked', _id, !isChecked);
};

const togglePrivate = ({ _id, isPrivate }) => {
  Meteor.call('tasks.setPrivate', _id, !isPrivate);
};

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

export const App = () => {
  const filter = {};

  const [hideCompleted, setHideCompleted] = useState(false);

  if (hideCompleted) {
    _.set(filter, 'checked', false);
  }

  const { tasks, incompleteTasksCount, user } = useTracker(() => {
    Meteor.subscribe('tasks');

    return ({
      tasks: Tasks.find(filter, { sort: { createdAt: -1 } }).fetch(),
      incompleteTasksCount: Tasks.find({ checked: { $ne: true } }).count(),
      user: Meteor.user(),
    });
  });

  if (!user) {                    //Only allow access to authenticated user.
    return (
      <div className="simple-todos-react">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="simple-todos-react">
      <h1>Norbert's Task List  ({incompleteTasksCount})</h1>
      {/* Filtering Checkbox */}
      <div className="filters">
        <label>
          <input
            type="checkbox"
            readOnly
            checked={Boolean(hideCompleted)}
            onClick={() => setHideCompleted(!hideCompleted)}
          />
          Hide Completed
        </label>
      </div>
      {/* Renders list items*/}
      <ul className="tasks">
        {tasks.map(task => <Task
          key={task._id}
          task={task}
          onCheckboxClick={toggleChecked}
          onDeleteClick={deleteTask}
          onTogglePrivateClick={togglePrivate}
        />)}
      </ul>

      <TaskForm user={user} />
    </div>
  )
}