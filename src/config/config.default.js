let dotenv = require('dotenv')


if(/server$/.test(process.cwd())){
    dotenv.config()
} else {
    dotenv.config({path:'server/.env'})
}
module.exports = process.env