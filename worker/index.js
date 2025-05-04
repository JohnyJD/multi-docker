import keys from "./keys/keys.js"
import redis from "redis";

const redisClient = redis.createClient({
    url: `redis://${keys.redis_host}:${keys.redis_port}`,
    socket: {
        reconnectStrategy: () => 1000
    }
})
.on("error", (err) => console.log("Redis client error : ", err));

const sub = redisClient.duplicate().on("error", (err) => console.log("Subscriber error : ", err));

(async () => {
    await redisClient.connect();
    await sub.connect();
    await sub.subscribe("insert", async (message, channel) => {
        console.log("Message received");
        await redisClient.hSet('values', message, fib(parseInt(message)));
    });
})();


function fib(index) {
    if(index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
};
