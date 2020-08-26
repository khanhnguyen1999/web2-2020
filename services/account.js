const Sequelize = require("sequelize");
const db = require("./db");
const Model = Sequelize.Model;

class Account extends Model {
    static async findByUserId(id) {
        return await Account.findOne({
            where: {
                userId: id,
            },
        });
    }

    static async findByAccountNumber(accountNumber) {
        return await Account.findOne({
            where: {
                accountNumber,
            },
        });
    }

    static async updateBalance(balance, accountNumber) {
        return await Account.update(
            {
                balance,
            },
            {
                where: {
                    accountNumber,
                },
            }
        );
    }
    static async updateLimit( accountNumber) {
        return await Account.update(
            {
                limit:0,
            },
            {
                where: {
                    accountNumber,
                },
            }
        );
    }

    static async updateLimitAmount( amount , accountNumber) {
        const account = await Account.findByAccountNumber(accountNumber)
        var newLm = 0;
        if(!account.limitAmount || account.limitAmount==0){
            newLm = parseInt(amount);
        }else{
            newLm = parseInt(account.limitAmount) + parseInt(amount)
        }
        
        return await Account.update(
            {
                limitAmount:newLm,
            },
            {
                where: {
                    accountNumber,
                },
            }
        );
    }
}
Account.init(
    {
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
        limitAmount: {
            type: Sequelize.INTEGER,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: "account",
        unique: false,
    }
);

const User = require("./user");
User.hasMany(Account);
Account.belongsTo(User);

module.exports = Account;
