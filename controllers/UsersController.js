import dbClient from '../utils/db'
const redisClient = require('../utils/redis')
const crypto = require('crypto');

export function hashPassword(password) {
  const sha1 = crypto.createHash('sha1')
  sha1.update(password);
  return sha1.digest('hex');
}

class UsersController {
  async postNew(req, res) {
    try {
      const { email, password } = req.body;
      if (!email) return res.status(400).send({error: 'Missing email' });
      if (!password) return res.status(400).send({error: 'Missing password'});

      const result = await dbClient.db.collection('users').findOne({ email })
      if (result) return res.status(400).send({ error: 'Already exist' });
      const hashedPass = hashPassword(password);
      const newUser = await dbClient.db.collection('users').insertOne({email, password: hashedPass });

      return res.status(200).send({ id: newUser.insertedId, email: newUser.ops[0].email });
    } catch (error) {
      console.error('Error occured connection to mongodb: ', error);
    }
  }
}

const usersController = new UsersController();
export default usersController;
