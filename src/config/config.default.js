const path = require("path")

function resolve(dir){
    return path.join(__dirname,dir)
}

const dotenv = require('dotenv')

dotenv.config({path:resolve("../../.env")})

module.exports = process.env