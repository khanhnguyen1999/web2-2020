const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('./db');
const Model = Sequelize.Model;

class User extends Model {
    static async findEmail() {
        return User.findAll();
    }

    static async findUserById(id) {
        return User.findByPk(id);
    }

    static async findUserByEmail(email) {
        return User.findOne({
            where: {
                email,
            }
        });
    }

    static findUserByUserName(username) {
        return User.findOne({
            where: {
                username,
            }
        });
    }

    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    static verifyPassword(passwordHash, password) {
        return bcrypt.compareSync(passwordHash, password);
    }
}
User.init({
    // attributes
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
    },
    displayName: {
        type: Sequelize.STRING,
    },
    idCardType: {
        type: Sequelize.STRING,
    },
    cardId: {
        type: Sequelize.STRING,
    },
    provideDate: {
        type: Sequelize.DATE,
    },
    idCardPhoto: {
        type: Sequelize.STRING, // Should be BLOB
    },
    tokenUser: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {
    sequelize: db,
    modelName: 'user',
});

module.exports = User;


