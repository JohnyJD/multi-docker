const keys =  {
    redis_host: process.env.REDIS_HOST,
    redis_port: process.env.REDIS_PORT,
    pg_user: process.env.PG_USER,
    pg_password: process.env.PG_PASSWORD,
    pg_host: process.env.PG_HOST,
    pg_port: process.env.PG_PORT,
    pg_database: process.env.PG_DATABASE,
    port: process.env.PORT
}

export default keys;