import { db } from '../db/database.js'

// 단, 트윗은 최근글이 제일 상단으로 올라오도록 !!

const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw JOIN users as us ON tw.userId = us.id'

const ORDER_DESC = 'ORDER BY tw.createdAt DESC'

export async function getAll(){ 
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0])
} 

export async function getAllByUsername(username){
    return db.execute(`${SELECT_JOIN} where username=? ${ORDER_DESC}`,[username]).then((result) => result[0])
}

export async function getByID(id){ 
    return db.execute(`${SELECT_JOIN} where tw.id=?`,[id]).then((result) => result[0][0])
}

export async function create(text, userId){

    return db.execute('INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)', [text, new Date(), userId]).then((result) => getByID(result[0].insertId))
}

export async function update(id,text){
    return db.execute('UPDATE tweets SET text=? where id=?',[text, id]).then(() => getByID(id))
}

export async function remove(id){
    return db.execute('DELETE FROM tweets where id=?',[id])
}
