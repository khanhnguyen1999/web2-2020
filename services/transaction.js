const bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const db = require('./db')

const Model = Sequelize.Model;
class Transaction extends Model {

}
Transaction.init({
  // attributes

  accountNumber: {
    type: Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  amount: {
    type: Sequelize.INTEGER,

    // allowNull defaults to true
  },
  content: {
    type: Sequelize.STRING,
  },
  beneficiaryBank: {
    type: Sequelize.STRING,
  },
  beneficiaryAccount: {
    type: Sequelize.STRING,
  },

}, {
  sequelize: db,
  modelName: 'transaction'
});
const Account  = require('./account')
const Bank = require('./bank')
Transaction.belongsTo(Account, {foreignKey: 'accountNumber'})
Transaction.belongsTo(Account, {foreignKey: 'beneficiaryAccount'})
Transaction.belongsTo(Bank, {foreignKey: 'beneficiaryBank'})
module.exports = Transaction;