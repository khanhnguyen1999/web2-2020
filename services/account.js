const bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const db = require('./db')

const Model = Sequelize.Model;
class Account extends Model {
    // static async findUserById(id){
    //     return await User.findByPk(id)
    // }
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
  accountNumber: {
    type: Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  balance: {
    type: Sequelize.INTEGER,
   
    // allowNull defaults to true
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
  sequelize: db,
  modelName: 'account'
});

const User = require('./user');
Account.belongsTo(User);

const Transaction  = require('./transaction')
Account.hasMany(Transaction)

module.exports = Account;