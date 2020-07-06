const Sequelize = require('sequelize');
const db = require('./db');
const Model = Sequelize.Model;

class Account extends Model {
    static async findAccountrByUserId(id) {
        return await Account.findOne(
            {
                where: {
                    user_id: id,
                }
            });
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
Account.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    accountNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    currencyUnit: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    openDate: {
        type: Sequelize.DATE,
    },
    limit: {
        type: Sequelize.INTEGER,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    underscored: true,
    sequelize: db,
    modelName: 'account'
});

const User = require('./user');
User.hasMany(Account);
Account.belongsTo(User);

module.exports = Account;