const Sequelize = require('sequelize');
const db = require('./db');
const Model = Sequelize.Model;

class Beneficiary extends Model {
    static async findAccountrByUserId(id) {
        return await Account.findOne({ where: { user_id: id } })
    }

    static async findAccountrByAccountNumber(accountNumber) {
        return await Account.findOne(
            {
                where: {
                    accountNumber: accountNumber,
                }
            });
    }

    static async updateBalance(balance, accountNumber) {
        return await Account.update(
            {
                balance: balance,
            }, {
            where: {
                accountNumber: accountNumber,
            }
        });
    }
}

Beneficiary.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    accountNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    bankName: {
        type: Sequelize.STRING,
    },
    balance: {
        type: Sequelize.INTEGER,
    },
}, {
    underscored: true,
    sequelize: db,
    modelName: 'beneficiary'
});

const Bank = require('./bank');
Beneficiary.belongsTo(Bank, { foreignKey: 'bankName' });

module.exports = Beneficiary;