import { Mongo } from 'meteor/mongo';
//Created module that instantiates and exports new Mongo collection
export default new Mongo.Collection('tasks');