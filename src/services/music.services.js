const connection = require('../app/database')

class MusicServices {
  async create(name, artist, url, cover, lrc, theme) {
    const statement = `insert into music (name, artist, url, cover, lrc, theme) values(?, ?, ?, ?, ?, ?);`
    const result = await connection.execute(statement, [
      name,
      artist,
      url,
      cover,
      lrc,
      theme
    ])
    return result[0]
  }

  async list() {
    const statement = `select * from music;`
    const result = await connection.execute(statement, [])
    return result[0]
  }
  async detail(id) {
    const statement = `select * from music where id = ?;`
    const result = await connection.execute(statement, [id])
    return result[0]
  }

  async update(id, name, artist, url, cover, lrc, theme) {
    const statement = `update music set name=?, artist=?, url=?, cover=?, lrc=?, theme=? where id = ?;`
    const result = await connection.execute(statement, [
      name,
      artist,
      url,
      cover,
      lrc,
      theme,
      id
    ])
    return result[0]
  }

  async remove(id) {
    const statement = `delete from music where id = ?;`
    const result = await connection.execute(statement, [id])
    return result[0]
  }
}
module.exports = new MusicServices()
