import { createClient } from "redis";

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', err => console.log('Redis Client Error ', err)); 
  }

  isAlive() {
    if (this.client.connected) {
      return true;
    } else {
      return false;
    }
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  async set(key, value, time) {
   return new Promise((resolve, reject) => {
     this.client.set(key, value, 'EX', time, (err) => {
       if (err) {
         reject(err);
       } else {
         resolve();
       }
     });
   });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if(err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }); 
  }
}

const redisClient = new RedisClient();
export default redisClient;
