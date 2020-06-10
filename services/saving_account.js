const bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const db = require('./db')

const Model = Sequelize.Model;
class SavingAccount extends Model {

}
SavingAccount.init({
  // attributes
  motherAccount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    // primaryKey:true,
  },
  interest: {
    type: Sequelize.FLOAT,
    allowNull: false
    // allowNull defaults to true
  },
  openDate: {
    type: Sequelize.DATE,
   
    // allowNull defaults to true
  },
  closeDate:{
    type: Sequelize.DATE,
  },
  depositTerm:{
    type: Sequelize.INTEGER,
  },
 
}, {
  sequelize: db,
  modelName: 'saving_account'
});

const Account = require('./account')
SavingAccount.belongsTo(Account)

module.exports = SavingAccount;