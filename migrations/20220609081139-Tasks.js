'use strict';

 module.exports = {async up(queryInterface, Sequelize) {

  //  * Add altering commands here.
  //  *
  //  * Example:
  return queryInterface.createTable('tasks', { 
    uuid: 
    { type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true 
  },
  task: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  done: {
    type: Sequelize.BOOLEAN
  }
  });

},

 async down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
}
}