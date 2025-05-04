import keys from "./keys/index.js";

// Express setup
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client setup
import { Pool } from "pg";
const pgClient = new Pool({
    user: keys.pg_user,
    password: keys.pg_password,
    host: keys.pg_host,
    port: keys.pg_port,
    database: keys.pg_database,
    ssl: 
        process.env.NODE_ENV !== 'production'
        ? false
        : {
            rejectUnauthorized: false
        }
    
});

pgClient.on("error", (err) => {
    console.log("Lost PG connection ", err)
});

pgClient.on("connect", (client) => {
    console.log("Successfully connected to Postgres DB")
    client.query(
        "CREATE TABLE IF NOT EXISTS values (number INT)"
    )
    .catch((err) => console.error(err));
});

// Redis setup
import redis from "redis";
const redisClient = redis.createClient({
    url: `redis://${keys.redis_host}:${keys.redis_port}`,
    socket: {
        reconnectStrategy: () => 1000
    }
})
.on("error", (err) => console.log("Redis lost connection ", err));

const redisPublisher = redisClient.duplicate();

(async () => {
    await redisClient.connect();
    await redisPublisher.connect();
})();


app.get("/", (req, res) => {
    res.send("Hi");
});

app.get("/values", async (req, res) => {
    const values = await pgClient.query(
        "SELECT * FROM values"
    );
    res.send(values.rows);
});

app.get("/values/current", async (req, res) => {
    const values = await redisClient.hGetAll("values");
    res.send(values);
});

app.post("/values", async (req, res) => {
    const index = req.body.index;
    console.log(index);
    if(parseInt(index) > 40) {
        res.status(422).send("Index is too high to be processed");
        return;
    }
    redisClient.hSet('values', index, 'Nothing yet');
    await redisPublisher.publish('insert', index);
    await pgClient.query('INSERT INTO values (number) VALUES($1)', [index]);
    res.send({working: true});
});

const port = keys.port ?? 5000; 
app.listen(port, (err) => {
    console.log("Server is running on PORT ", port);
});