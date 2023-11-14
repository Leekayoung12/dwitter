import SQ from 'sequelize'
import { sequelize } from '../db/database.js'
import { User } from './auth.js'

const DataTypes = SQ.DataTypes
const Sequelize = SQ.Sequelize

const Tweet = sequelize.define(
    'tweet',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
})
Tweet.belongsTo(User)

const INCLUDE_USER = {
    attributes: [
        'id', 'text', 'createdAt', 'userId', 
        [Sequelize.col('user.name'), 'name'],
        [Sequelize.col('user.username'), 'username'],
        [Sequelize.col('user.url'), 'url']
    ],
    include: {
        model: User,
        attributes: [],
    }
} // [Sequelize...] 이렇게 써줘야 같은 레벨로 가져옴,하위가 아니라

const ORDER_DESC = {
    order: [['createdAt', 'DESC']]
}

export async function getAll(){ 
    return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC })
} 

export async function getAllByUsername(username){
    return Tweet.findAll({
        ...INCLUDE_USER, ...ORDER_DESC, include: {
            ...INCLUDE_USER.include, where: { username }
        }
    })
}

export async function getByID(id){ 
    return Tweet.findOne({ where: { id }, ...INCLUDE_USER })
}

export async function create(text, userId){
    return Tweet.create({ text, userId })
    .then((data) => this.getByID(data.dataValues.id))
}

export async function update(id,text){
    return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
        tweet.text = text 
        return tweet.save()
    })
}

export async function remove(id){
    return Tweet.findByPk(id).then((tweet) => {
        tweet.destroy()
    })
}
