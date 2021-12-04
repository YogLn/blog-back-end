const connection = require('../app/database')

class ArticleService {
  async create(title, titleImg, description, content) {
    const statement = `INSERT INTO article (title, description, content, titleImg) VALUES (?, ?, ?, ?);`
    const result = await connection.execute(statement, [
      title,
      description,
      content,
      titleImg
    ])
    return result[0]
  }

  async getArticleList(offset, size) {
    const statement = `
    SELECT 
      a.id id,a.title title, a.titleImg titleImg, a.description description, a.viewTimes viewTimes, a.createAt createTime, a.updateAt updateTime,
      (SELECT count(*) from article) total,
      (SELECT count(*) from comment c where c.article_id=a.id ) commentNum,
      IF(COUNT(l.id), JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name, 'color', l.color)), NULL) labels
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
    const statement1 = `update article set viewTimes = (viewTimes+1) where id = ?;`
    const statement2 = `
				SELECT
				a.id id,
				a.title title,
				a.titleImg titleImg,
				a.description description,
				a.content content,
        (select count(*) from comment c where c.id = a.id) commmentNum,
			IF
				( COUNT( l.id ), JSON_ARRAYAGG( JSON_OBJECT( 'id', l.id, 'name', l.NAME, 'color', l.color )), NULL ) labels 
			FROM
				article a
				LEFT JOIN article_label al ON a.id = al.article_id
				LEFT JOIN label l ON al.label_id = l.id 
			WHERE
				a.id = ?
			GROUP BY a.id;
			`
    try {
      await connection.execute(statement1, [id])
      const result = await connection.execute(statement2, [id])
      return result[0]
    } catch (error) {
      console.log(error)
    }
  }

  async update(id, title, titleImg, description, content) {
    const statement = `update article set title=?,titleImg=?, description=?, content=? where id=?;`
    const result = await connection.execute(statement, [
      title,
      titleImg,
      description,
      content,
      id
    ])
    return result[0]
  }

  async remove(id) {
    const statement = `delete from article where id = ?;`
    const result = await connection.execute(statement, [id])
    return result[0]
  }

  async hasLabel(articleId, labelId) {
    const statement = `select * from article_label where article_id = ? and label_id = ?`
    const result = await connection.execute(statement, [articleId, labelId])
    return result[0].length ? true : false
  }

  async addLabel(articleId, labelId) {
    const statement = `insert into article_label (article_id, label_id) values (?, ?)`
    const result = await connection.execute(statement, [articleId, labelId])
    return result[0]
  }

  async deleteLabel(articleId) {
    const statement = `delete from article_label where article_id = ?;`
    const result = await connection.execute(statement, [articleId])
    return result[0]
  }

  async getListByInfo(name) {
    try {
      const statement = `SELECT * FROM article WHERE title or description LIKE ?`;
      const result = await connection.execute(statement, [`%${name}%`])
      return result[0]
    } catch (error) {
      console.log(err)
    }
  }
}

module.exports = new ArticleService()
