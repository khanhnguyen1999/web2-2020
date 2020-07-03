const bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const db = require('./db')

const Model = Sequelize.Model;
class beneficiary extends Model {
    static async findAccountrByUserId(id){
        return await beneficiary.findOne({where:{user_id:id}})
    }
    static async findAccountrByAccountNumber(accountNumber){
      return await beneficiary.findOne({where:{accountNumber:accountNumber}})
    }
    static async updateBalance(balance,accountNumber){
      return await beneficiary.update(
        {balance:balance},
        {where:{accountNumber:accountNumber}}
        )
    }
}
beneficiary.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  displayName:{
    type: Sequelize.STRING,
  },
  accountNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey:true,
  },

  bankName:{
    type: Sequelize.STRING,
  },
  balance: {
    type: Sequelize.INTEGER,
  },

}, {
  underscored:true,
  sequelize: db,
  modelName: 'beneficiary'
});

// const User = require('./user');
// User.hasMany(Account)
// Account.belongsTo(User);
const Bank = require('./bank')
beneficiary.belongsTo(Bank, {foreignKey: 'bankName'})

// Account.belongsTo(Transaction,{as:'test'})

module.exports = beneficiary;