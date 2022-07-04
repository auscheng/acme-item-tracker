const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:12345@localhost:5432/the_acme_item_tracker_db');

const { STRING, INTEGER } = Sequelize;

const User = conn.define('user', {
  name: {
    type: STRING
  }
});

const Thing = conn.define('thing', {
  name: {
    type: STRING
  },
  ranking: {
    type: INTEGER,
    defaultValue: 1
  }
});

const Join = conn.define('join', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  thingId: {
    type: INTEGER,
    references: {
      model: Thing,
      key: 'id'
    }
  }
})

Thing.belongsToMany(User, {through: Join, foreignKey: { name: 'thingId'}});
User.belongsToMany(Thing, {through: Join, foreignKey: { name: 'userId'}});

module.exports = {
  conn,
  User,
  Thing,
  Join
};
