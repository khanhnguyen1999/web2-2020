const bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const db = require('./db')

const Model = Sequelize.Model;
class Account extends Model {
    static async findAccountrByUserId(id){
        return await Account.findOne({where:{user_id:id}})
    }
    static async findAccountrByAccountNumber(accountNumber){
      return await Account.findOne({where:{accountNumber:accountNumber}})
    }
    static async updateBalance(balance,accountNumber){
      return await Account.update(
        {balance:balance},
        {where:{accountNumber:accountNumber}}
        )
    }
    // static async findUserByEmail(email){
    //     return User.findOne({
    //         where:{
    //             email,
    //         }
    //     });
    // }
    
    // static async verifyPassword(password,passwordHash)
    // {
    //     return bcrypt.compareSync(password,passwordHash)
    // }
    // static async hashPassword(password){
    //     return bcrypt.hashSync(password,10);
    // }
}
Account.init({
  // attributes
//   userId: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true
//   },
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  accountNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey:true,
  },
  balance: {
    type: Sequelize.INTEGER,
   
    // allowNull defaults to true
  },
  savingAccount:{
    type: Sequelize.INTEGER,
  },
  currencyUnit:{
    type: Sequelize.STRING,
  },
  status:{
    type: Sequelize.BOOLEAN,
  },
  openDate:{
    type: Sequelize.DATE,
  },
  limit:{
    type: Sequelize.INTEGER,
  },
 
}, {
  underscored:true,
  sequelize: db,
  modelName: 'account'
});

const User = require('./user');
User.hasMany(Account)
Account.belongsTo(User);


// Account.belongsTo(Transaction,{as:'test'})

module.exports = Account;