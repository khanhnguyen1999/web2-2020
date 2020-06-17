const bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const db = require('./db')

const Model = Sequelize.Model;
class Bank extends Model {
  static async AllBank(id){
    return await Bank.findAll()
}

}
Bank.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  nameBank: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey:true,
  },
  idBank: {
    type: Sequelize.STRING,
  },
}, {
  underscored:true,
  sequelize: db,
  modelName: 'bank'
});




// Account.belongsTo(Transaction,{as:'test'})

module.exports = Bank;