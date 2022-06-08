import { Sequelize } from "sequelize";
import Models from './Model.js'

const sequelize = new Sequelize('todolist','user','root',{
    dialect: 'postgres',
    host: 'localhost'
})

const Model = Models(sequelize)

export default {
    sequelize: sequelize,
    model: Model
}