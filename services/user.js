const bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const db = require('./db')

const Model = Sequelize.Model;
class User extends Model {
  static async findUserById(id) {
    return await User.findByPk(id)
  }
  static async findUserByEmail(email) {
    return User.findOne({
      where: {
        email,
      }
    });
  }

  static async verifyPassword(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash)
  }
  static async hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }
}
User.init({
  // attributes
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  password: {
    type: Sequelize.STRING,

    // allowNull defaults to true
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
    type: Sequelize.BLOB,
  },

}, {
  sequelize: db,
  modelName: 'user'
});

module.exports = User;


