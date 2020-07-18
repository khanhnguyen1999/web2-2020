const Sequelize = require("sequelize");
const db = require("../services/db");
const Model = Sequelize.Model;
const bcrypt = require("bcrypt");

class User extends Model {
    static async findById(id) {
        return await User.findByPk(id);
    }

    static async findByEmail(email) {
        return await User.findOne({
            where: {
                email,
            },
        });
    }

    static async findByUsername(username) {
        return await User.findOne({
            where: {
                username,
            },
        });
    }

    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    static verifyPassword(passwordHash, password) {
        return bcrypt.compareSync(passwordHash, password);
    }
}
User.init(
    {
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
            type: Sequelize.STRING,
        },
        tokenUser: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        modelName: "user",
    }
);

module.exports = User;
