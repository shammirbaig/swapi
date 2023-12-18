const axios = require('axios');
const express = require('express');
const redis = require('redis');
const cron = require('node-cron');

const starwarsURL = 'https://swapi.dev/api/';
const app = express();
const redisURL = process.env.REDIS_URL || 'redis://localhost:6379';

(async () => {
  // Connect to your internal Redis instance using the REDIS_URL environment variable
  // The REDIS_URL is set to the internal Redis URL e.g. redis://red-343245ndffg023:6379
  const client = redis.createClient({
      url: redisURL
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  // Send and retrieve some values
  await client.set('key', 'node redis');
  const value = await client.get('key');

  console.log("found value: ", value)
})();

app.get('/', (req, res) => {
    res.send('<h1>Hello! Welcome to Redis Cache</h1>');
});

const checkCache = async (req, res, next) => {
    const { type, id } = req.params;
    const { search } = req.query;
    let cacheKey = id || search;

    try {
        let data = await client.get(`${type}:${cacheKey}`);
        if (!data) {
            return next();
        } else {
            return res.json({ data: JSON.parse(data), info: 'Data from cache' });
        }
    } catch (error) {
        console.error(error);
        next();
    }
};

app.get('/api/:type/:id?', checkCache, async (req, res) => {
    const { type, id } = req.params;
    const { search } = req.query;
    try {
        let url;
        if (id) {
          url = `${starwarsURL}${type}/${id}`;
        } else if (search) {
          url = `${starwarsURL}${type}/?search=${search}`;
        } else {
          url = `${starwarsURL}${type}`;
        }
        let response = await axios(url);
        let data = response.data;
        let cacheKey = id || search;
        client.set(`${type}:${cacheKey}`, JSON.stringify(data));
        res.json({ data, info: 'Data from 3rd party API' });
    } catch (error) {
        console.error('Error in /api/:type/:id handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//cron Job to clear cache at every midnight 12 am
cron.schedule('0 0 * * *', () => {
    console.log('Clearing Redis cache...');
    client.flushall((err, succeeded) => {
        console.log(succeeded); 
      });
  });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});
