import  Sequelize  from "sequelize";

export default function (sequelize){
    return sequelize.define('tasks',{
            uuid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            task: {
                type: Sequelize.TEXT
            },
            createdAt:{
                type: Sequelize.TEXT
            },
            done: {
                type: Sequelize.BOOLEAN
            }
    },{
        timestamps: false
    })
}