const Sequelize = require("sequelize");
const db = require("./db");
const Model = Sequelize.Model;

class SavingAccount extends Model {
    static async findSavingAccountrByAccountNumber(accountNumber) {
        return await SavingAccount.findAll({
            where: {
                accountAccountNumber: accountNumber,
            },
        });
    }

    static async findById(id) {
        return await SavingAccount.findOne({
            where: {
                id,
            },
        });
    }

    static async updateFund(fund, id) {
        return await SavingAccount.update(
            {
                fund,
            },
            {
                where: {
                    id,
                },
            }
        );
    }

    static async updateDateSaving(openDate, closeDate, interest, id) {
        return await SavingAccount.update(
            {
                openDate,
                closeDate,
                interest,
            },
            {
                where: {
                    id,
                },
            }
        );
    }

    static async deleteById(id) {
        return await SavingAccount.destroy({
            where: {
                id,
            },
        });
    }
}

SavingAccount.init(
    {
        fund: {
            type: Sequelize.INTEGER,
        },
        interest: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        interestRate: {
            type: Sequelize.FLOAT,
        },
        depositTerm: {
            type: Sequelize.INTEGER,
        },
        openDate: {
            type: Sequelize.DATE,
        },
        closeDate: {
            type: Sequelize.DATE,
        },
        type: {
            type: Sequelize.INTEGER,
        },
    },
    {
        sequelize: db,
        modelName: "saving_account",
    }
);

const Account = require("./account");
Account.hasMany(SavingAccount);
SavingAccount.belongsTo(Account);

module.exports = SavingAccount;
