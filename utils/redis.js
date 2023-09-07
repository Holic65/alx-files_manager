import { createClient } from "redis";

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', err => console.log('Redis Client Error ', err)); 
    this.client.on('ready', () => {});
  }

  isAlive() {
    return this.client.connected
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          reject(err);
        }
        if(value == undefined) {
          resolve(null);
        }
        resolve(value);
      });
    });
  }

  async set(key, value, time) {
   return new Promise((resolve, reject) => {
     this.client.setex(key, time, value, (err) => {
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
