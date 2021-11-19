const connection = require('../app/database')

class UserService {
  async create(user) {
		const { name, password } = user
    const statement = `insert into user (name, password) values (?, ?);`
    const result = await connection.execute(statement, [name, password])
		return result[0]
  }
	
  async getUserByName(name) {
    const statement = `select * from user where name = ?;`
    const result = await connection.execute(statement, [name])
    return result[0]
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }

  async getUsersList(offset, size) {
    const statement = `SELECT * FROM user limit ?, ?;`
    const result = await connection.execute(statement, [offset, size]);
    return result[0]
  }

  async deleteUserById(userId) {
    const statement = `DELETE FROM user WHERE id = ?;`
    const result = await connection.execute(statement, [userId])
    return result[0]
  }
}

module.exports = new UserService()
