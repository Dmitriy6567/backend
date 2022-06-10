'use strict';

 module.exports = {async up(queryInterface, Sequelize) {

  return queryInterface.createTable('tasks', { 
    uuid: { 
    type: Sequelize.UUID,
    autoIncrement: false,
    primaryKey: true ,
    defaultValue: Sequelize.UUIDV$
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updatedAt:{
    type: Sequelize.DATE,
    allowNull: false
  },
  done: {
    type: Sequelize.BOOLEAN
  }
  });
},

 async down(queryInterface, Sequelize) {
  return queryInterface.dropTable('tasks')
}
}