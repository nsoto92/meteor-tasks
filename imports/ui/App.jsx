import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';  // hook used to render tasks
import { Task } from './Task'
import Tasks from '../api/tasks'
import { TaskForm } from './TaskForm'

export const App = () => {
  const tasks = useTracker(() => Tasks.find({}).fetch());  //

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      {/* Renders list items*/}
      <ul>
        {tasks.map(task => <Task key={task._id} task={task} />)}
      </ul>

      <TaskForm />
    </div>
  )
}