//imports task collection to server
import { Meteor } from 'meteor/meteor';
import '/imports/api/tasks';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername('meteorite')) {  //Create default user & password
    Accounts.createUser({
      username: 'meteorite',
      password: 'password'
    });
  }
});
