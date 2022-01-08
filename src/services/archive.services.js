const connection = require('../app/database')

class ArchiveService {
  async create(title, image, content) {
    const statement = `insert into archive (title, image, content) values (? , ?, ?);`
    const result = await connection.execute(statement, [title, image, content])
    return result[0]
  }
  
  async getArchiveList() {
    const statement = `select * from archive ORDER BY id DESC;`
    const result = await connection.execute(statement, [])
    return result[0]
  }
	
	async update(title, image, content, id) {
    const statement = `update archive set title = ?, image = ?, content = ? where id = ?;`
    const result = await connection.execute(statement, [title, image, content, id])
    return result[0]
  }

	async remove(id) {
		const statement = `delete from archive where id = ?;`
		const result = await connection.execute(statement, [id])
		return result[0]
	}
}

module.exports = new ArchiveService()
