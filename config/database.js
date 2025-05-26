const mysql = require('mysql2');
require('dotenv').config();

// Create connection pool for better performance
// Railway provides MYSQL_URL, local development uses individual env vars
const pool = mysql.createPool(
    process.env.MYSQL_URL ? {
        // Railway production configuration
        uri: process.env.MYSQL_URL,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        acquireTimeout: 60000,
        timeout: 60000,
        reconnect: true
    } : {
        // Local development configuration
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

// Create promise-based connection
const promisePool = pool.promise();

// Test database connection
const testConnection = async () => {
    try {
        const connection = await promisePool.getConnection();
        console.log('✅ Database connected successfully');
        
        // Log connection info (helpful for debugging)
        if (process.env.MYSQL_URL) {
            console.log('🚀 Connected to Railway MySQL database');
        } else {
            console.log(`🏠 Connected to local MySQL: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
        }
        
        connection.release();
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.error('Connection details:', {
            isRailway: !!process.env.MYSQL_URL,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });
        process.exit(1);
    }
};

module.exports = {
    pool: promisePool,
    testConnection
};