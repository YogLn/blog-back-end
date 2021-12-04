const connection = require('../app/database')

class LabelService {
	async create (name, color) {
		const statement = `insert into label (name, color) values (?, ?);`
		const result = await connection.execute(statement, [name, color])
		return result[0]
	}

	async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }

	async getLabelList() {
		const statement = `SELECT 
		l.id labelId, l.name labelName, l.color color, COUNT(a.id) total
			FROM label l
		LEFT JOIN article_label al
		ON l.id = al.label_id
		LEFT JOIN article a
		ON al.article_id = a.id
		GROUP BY l.id;`
		const result = await connection.execute(statement)
		return result[0]
	}

	async deleteLabelById(id) {
		const statement = `DELETE FROM label WHERE id = ?;`;
		const result = await connection.execute(statement, [id]);
		return result[0]
	}

}
module.exports = new LabelService()