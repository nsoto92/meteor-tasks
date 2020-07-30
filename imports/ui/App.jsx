import React from 'react';
import { Task } from './Task'

// Created Sample Data
const tasks = [
  { _id: 1, text: 'First Task' },
  { _id: 2, text: 'Second Task' },
  { _id: 3, text: 'Third Task' },
];

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    {/* Renders list items from Task.jsx */}
    <ul>
      {tasks.map(task => <Task key={task._id} task={task} />)}
    </ul>
  </div>
);