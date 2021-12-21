// model 是代表数据库这种表的抽象
const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const User = seq.define('test_user',{
    user_name:{
        type: DataTypes.STRING(1234) ,
        allowNull: false,
        unique: true,
        comment: '用户名,唯一'
    },
    password: {
        type:DataTypes.CHAR(64),
        allowNull:false,
        comment:"密码"
    },
    is_admin: {
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:0,
        comment:"是否为管理员"
    }
})

module.exports = User