//imports task collection to server
import { Meteor } from 'meteor/meteor';
import Tasks from '/imports/api/tasks';

function insertTask({ title }) {
  Tasks.insert({ title, createdAt: new Date() });
}

Meteor.startup(() => {
  if (Tasks.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask)
  }
});
