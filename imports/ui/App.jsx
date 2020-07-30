import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';  // hook used to render tasks
import _ from 'lodash'
import { Task } from './Task'
import Tasks from '../api/tasks'
import { TaskForm } from './TaskForm'
import { LoginForm } from './LoginForm'

const toggleChecked = ({ _id, isChecked }) => {  //Toggle checkbox
  Tasks.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};

const deleteTask = ({ _id }) => Tasks.remove(_id);

export const App = () => {
  const filter = {};

  const [hideCompleted, setHideCompleted] = useState(false);

  if (hideCompleted) {
    _.set(filter, 'checked', false);
  }

  const { tasks, incompleteTasksCount, user } = useTracker(() => ({                       //Filters task by newest first, hides completed, keeps count.
    tasks: Tasks.find(filter, { sort: { createdAt: -1 } }).fetch(),
    incompleteTasksCount: Tasks.find({ checked: { $ne: true } }).count(),
    user: Meteor.user(),
  }));

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
      {/* FIltering Checkbox */}
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
        />)}
      </ul>

      <TaskForm user={user} />
    </div>
  )
}