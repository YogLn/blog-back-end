const connection = require('../app/database')

class CommentService{
	async create(articleId, content, userId) {
		const statement = `insert into comment (article_id, content, user_id) values (?, ?, ?)`
		const result = await connection.execute(statement, [articleId, content, userId])
		return result[0]
	}

	async reply(articleId, content, commentId, user_id) {
		const statement = `insert into comment (article_id, content, user_id, comment_id) values (?, ?, ?, ?)`
		const result = await connection.execute(statement, [articleId, content, user_id, commentId,])
		return result[0]
	}

	async remove(commentId) {
		const statement = `delete from comment where id = ?;`
		const result = await connection.execute(statement, [commentId])
		return result[0]
	}

	async getCommentListByArticleId(articleId) {
		const statement = `SELECT m.id, m.content, m.comment_id commentId, m.createAt createTime,
													(select count(*) from comment where comment.article_id = ?) total,
												 JSON_OBJECT( 'id', u.id, 'name', u.NAME, 'avatarUrl', u.avatar_url) user 
											 FROM
											 	 COMMENT m
											 	 LEFT JOIN USER u ON u.id = m.user_id 
										 	 WHERE
											 	 article_id = ?;`

		const result = await connection.execute(statement, [articleId,articleId])
		return result[0]
	}
}

module.exports = new CommentService()