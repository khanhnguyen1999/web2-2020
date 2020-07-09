const bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const db = require('./db')

const Model = Sequelize.Model;
class SavingAccount extends Model {
  static async allSavingAccount(){
    return await  SavingAccount.findAll({})
  }
  static async findSavingAccountrByAccountNumber(accountNumber){
    return await SavingAccount.findAll({where:{accountAccountNumber:accountNumber}})
  }
  static async findSavingAccountrById(id){
    return await SavingAccount.findOne({where:{id:id}})
  }
  static async updateFund(fund,idSavingAccount){
    return await SavingAccount.update(
      {fund:fund},
      {where:{id:idSavingAccount}}
      )
  }
  static async updateDateSaving(openDate,closeDate,interest,idSavingAccount){
    return await SavingAccount.update(
      {
        openDate:openDate,
        closeDate:closeDate,
        interest:interest,
      },
      {where:{id:idSavingAccount}}
      )
  }
  static async deleteSavingAccountrById(id){
    return await SavingAccount.destroy({
      where: {
        id: id
      }
    });
  }
}
SavingAccount.init({
  // attributes
  fund:{
    type: Sequelize.INTEGER,
  },
  interest: {
    type: Sequelize.INTEGER,
    allowNull: false,
    // allowNull defaults to true
  },
  depositTerm:{
    type: Sequelize.INTEGER,
  },
  interestRate:{
    type: Sequelize.FLOAT,
  },
  type:{
    type: Sequelize.INTEGER,
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