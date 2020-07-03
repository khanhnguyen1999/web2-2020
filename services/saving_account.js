const bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const db = require('./db')

const Model = Sequelize.Model;
class SavingAccount extends Model {

}
SavingAccount.init({
  // attributes
  amountSaving:{
    type: Sequelize.INTEGER,
  },
  depositTerm:{
    type: Sequelize.INTEGER,
  },
  interest: {
    type: Sequelize.FLOAT,
    allowNull: false,
    // allowNull defaults to true
  },
  openDate: {
    type: Sequelize.DATE, 
    // allowNull defaults to true
  },
  closeDate:{
    type: Sequelize.DATE,
  },

}, {
  underscored:true,
  sequelize: db,
  modelName: 'saving_account',
});

const Account = require('./account')
Account.hasMany(SavingAccount)
SavingAccount.belongsTo(Account)

module.exports = SavingAccount;