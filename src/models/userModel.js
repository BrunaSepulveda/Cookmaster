const connection = require('../config/conn');

const findByEmail = async (emailRequest) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email: emailRequest }));

  if (!user) return null;

  return user;
};

const createUser = async (name, email, password) => {
  const user = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }));
  return user.ops[0];
};

module.exports = {
  findByEmail,
  createUser,
};
