const connection = require('../app/database')

class PhotoService {
	async create(imgUrl, description) {
		const statement = `insert into photo (imgUrl, description) values (?, ?);`
		const result = await connection.execute(statement, [imgUrl, description])
		return result[0]
	}

	async deletePhotoById(id) {
		const statement = `delete from photo where id = ?;`
		const result = await connection.execute(statement, [id])
		return result[0]
	}

	async list(offset, limit) {
		const statement = `select * from photo ORDER BY id DESC limit ?, ?;`
		const result = await connection.execute(statement, [offset, limit])
		return result[0]
	}
}

module.exports = new PhotoService()