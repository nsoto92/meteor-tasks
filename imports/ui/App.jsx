import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';  // hook used to render tasks
import { Task } from './Task'
import Tasks from '../api/tasks'
import { TaskForm } from './TaskForm'

const toggleChecked = ({ _id, isChecked }) => {  //Toggle checkbox
  Tasks.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};

const deleteTask = ({ _id }) => Tasks.remove(_id);

export const App = () => {
  const tasks = useTracker(() => Tasks.find({}, { sort: { createdAt: -1 } }).fetch());  //Shows newest tasks first

  return (
    <div className="simple-todos-react">
      <h1>Norbert's Task List</h1>
      {/* Renders list items*/}
      <ul className="tasks">
        {tasks.map(task => <Task
          key={task._id}
          task={task}
          onCheckboxClick={toggleChecked}
          onDeleteClick={deleteTask}
        />)}
      </ul>

      <TaskForm />
    </div>
  )
}