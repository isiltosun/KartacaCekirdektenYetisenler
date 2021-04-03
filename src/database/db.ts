import { Pool } from "pg";

import { LogData } from "../services/kafkaLog.service";

const createLogTable = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS logs(
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        method varchar(6),
        response_time float,
        timestamp TIMESTAMP
    );
`

export const pool = new Pool({
    connectionString: (process.env.DB_URL || 'postgres://postgres:postgres@localhost:5432/postgres')
});

export const createLogsTable = async (db: Pool) => {
    console.info("Trying to create 'logs' table if not exists.");
    return await db.query(createLogTable);
}

export const insertLog = async (db: Pool, data: LogData) => {
    const result = await db.query(`
        INSERT INTO logs(method, response_time, timestamp)
            VALUES ($1, $2, $3); 
    `, [data.method, data.delta, new Date(data.timestamp as number)])
    .catch(e => {
        console.error(e);
    });

    return result;
}

export const getLogsForLastHour = async (db: Pool) => {
    const result = await db.query(`
        SELECT id, method, response_time, timestamp
        FROM logs
        WHERE timestamp >= NOW() - INTERVAL '1 HOURS';
    `).catch(e => {
        console.error(e);
    });
    
    return result;
}