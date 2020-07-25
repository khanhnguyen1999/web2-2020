const Sequelize = require('sequelize');
const db = require('./db');
const Model = Sequelize.Model;

class Transaction extends Model { }

Transaction.init({
    transactionID: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    accountNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    amount: {
        type: Sequelize.INTEGER,
    },
    content: {
        type: Sequelize.STRING,
    },
    beneficiaryAccount: {
        type: Sequelize.STRING,
    },
    fee: {
        type: Sequelize.INTEGER,
    },
    status: {
        type: Sequelize.STRING,
    },
    details: {
        type: Sequelize.STRING,
    }
}, {
    sequelize: db,
    modelName: 'transaction'
});

const Account = require('./account');
const Bank = require('./bank');

Transaction.belongsTo(Account, { foreignKey: 'accountNumber' });
Transaction.belongsTo(Account, { foreignKey: 'beneficiaryAccount' });
Transaction.belongsTo(Bank, { foreignKey: 'beneficiaryBank' });

module.exports = Transaction;