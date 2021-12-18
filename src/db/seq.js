const {Sequelize} = require('sequelize')
const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB 
} = require('../config/config.default')

console.log(MYSQL_HOST,MYSQL_USER,MYSQL_PWD,MYSQL_DB);

const seq = new Sequelize(MYSQL_DB ,MYSQL_USER,MYSQL_PWD,{
    host: MYSQL_HOST,
    dialect: 'mysql'
})

module.exports = seq


seq.authenticate().then(()=>{
    console.log('success');
}).catch((err)=>{
    console.log('connection err'+err);
})