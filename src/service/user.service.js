const User = require('../model/user.model')

class UserService {
    async createUser(user_name,password) {
        // 1.写入数据库
        const res = await User.create({
            // 表的字段
            user_name,
            password
        })
        return res.dataValues
    }
}

module.exports = new UserService()