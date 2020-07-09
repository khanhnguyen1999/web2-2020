const Sequelize = require('sequelize');
const db = require('./db');

const Model = Sequelize.Model;
class BeneficiaryAccount extends Model {
    static async findByAccountNumber(accountNumber) {
        return await beneficiary.findOne({
            where: {
                accountNumber
            }
        });
    }

    static async updateBalance(balance, accountNumber) {
        return await beneficiary.update(
            {
                balance
            }, {
            where: {
                accountNumber
            }
        });
    }
}

BeneficiaryAccount.init({
    displayName: {
        type: Sequelize.STRING,
    },
    beneficiaryBank: {
        type: Sequelize.STRING,
    },
    pendingAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    underscored: true,
    sequelize: db,
    modelName: 'beneficiaryAccount',
});

module.exports = BeneficiaryAccount;