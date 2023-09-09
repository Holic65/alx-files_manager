const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const {
      DB_HOST = '127.0.0.1',
      DB_PORT = 27017,
      DB_DATABASE = 'files_manager',
    } = process.env;
  
  
    const url =  `mongodb://${DB_HOST}:${DB_PORT}?directConnection=true`;
    this.client = new MongoClient(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    this.client.connect().catch((error) => {
      console.error('Error occurred while connection to MongoDB:', error);
    });

    this.db = this.client.db(DB_DATABASE);
  }


  async isAlive() {
    //return !!this.client && !!this.client.topology && this.client.topology.isConnected()
    return this.client.isConnected()
  }

  async nbUsers() {
    const users = this.db.collection('users');
    return new Promise((resolve, reject) => {
      users.countDocuments((err, val) => {
        if (err) {
          reject(err)
        } else {
          resolve(val);
        }
      });
    });
  }

  async nbFiles() {
    const files = this.db.collection('files');
     return new Promise((resolve, reject) => {
       files.countDocuments((err, val) => {
         if (err) {
           reject(err)
         } else {
           resolve(val);
         }
       });
     });
  }
}

const dbClient = new DBClient();
export default dbClient;
