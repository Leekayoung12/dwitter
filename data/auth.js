import { db } from '../db/database.js'

export async function createUser(user){
    const { username, password, name, email, url} = user
    return db.execute('INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)', [username, password, name, email, url]).then((result) => result[0].insertId)
}

export async function findByUsername(username){
    return db.execute('SELECT * from users where username = ?',[username]).then((result) => result[0][0])
   
}

export async function findById(id){
    return db.execute('SELECT * from users where id = ?',[id]).then((result) => result[0][0])
}