import redis from 'ioredis';

const client = redis.createClient();

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Error connecting to Redis', err);
});

export { client };
