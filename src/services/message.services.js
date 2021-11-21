const connection = require('../app/database')

class MessageServices {
	async create(userId, username, content) {
		const statement = `insert into message (user_id, username, content) values(? ,?, ?);`
		const result = await connection.execute(statement, [ userId, username, content])
		return result[0]
	}

	async getMsgList(offset, size) {
		const statement = `select m.id id, m.content content, m.createAt createAt, 
											(select COUNT(*) from message) total,
												JSON_OBJECT('username', m.username, 'avatar', u.avatar_url) user
											from message m
											left join user u on u.id = m.user_id
											ORDER BY m.id desc limit ?, ?;`
		const result = await connection.execute(statement, [offset, size])
		return result[0]
	}

	async update(id, content) {
		const statement = `update message set content = ? where id = ?;`
		const result = await connection.execute(statement, [content, id])
		return result[0]
	}

	async remove(id) {
		const statement = `delete from message where id = ?;`
		const result = await connection.execute(statement, [id])
		return result[0]
	}
}
module.exports = new MessageServices()