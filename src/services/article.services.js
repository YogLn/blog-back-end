const connection = require('../app/database')

class ArticleService {
	async create(title, titleImg, description, content) {
		const statement = `INSERT INTO article (title, description, content, titleImg) VALUES (?, ?, ?, ?);`
		const result = await connection.execute(statement, [title, description, content , titleImg])
		return result[0]
	}

	async getArticleList(offset, size) {
		const statement = `
		SELECT 
			a.id id,a.title title, a.titleImg titleImg, a.description description, a.createAt createTime, a.updateAt updateTime,
			IF(COUNT(l.id), JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)), NULL) labels
		FROM article a
			LEFT JOIN article_label al
			ON a.id = al.article_id
			LEFT JOIN label l
			ON al.label_id = l.id 
		GROUP BY a.id
		ORDER BY id desc
		limit ?, ?
		`
		const result = await connection.execute(statement, [offset, size])
		return result[0]
	}

	async getArticleDetailsById(id) {
		const statement = `select * from article where id = ?;`
		const result = await connection.execute(statement, [id])
		return result[0]
	}

	async update(id, content) {
		const statement = `update article set content = ? where id = ?;`
		const result = await connection.execute(statement, [content, id])
		return result[0]
	}

	async remove(id) {
		const statement = `delete from article where id = ?;`
		const result = await connection.execute(statement, [id])
		return result[0]
	}

	async hasLabel(articleId, labelId) {
    const statement = `select * from article_label where article_id = ? and label_id = ?`;
    const result = await connection.execute(statement, [articleId, labelId]);
    return result[0] ? true: false;
  }

	async addLabel(articleId, labelId) {
		const statement = `insert into article_label (article_id, label_id) values (?, ?)`;
		const result = await connection.execute(statement, [articleId, labelId]);
		return result[0]
	}
}

module.exports = new ArticleService()