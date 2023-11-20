// import { db } from '../db/database.js'
import MongoDb from 'mongodb'
import { getUsers } from '../db/database.js'
const ObjectID = MongoDb.ObjectId




export async function createUser(user){
    return getUsers().insertOne(user).then((result) => result.ops[0]._id.toString())
}

export async function findByUsername(username){
    return getUsers().find({ username }).next().then(maoOptionalUser)
   
}

export async function findById(id){
    return getUsers().find({ _id: new ObjectID(id)})
    .next()
    .then(maoOptionalUser)
}

function maoOptionalUser(user) {
    return user ? { ...user, id:user._id.toString() }: user
}