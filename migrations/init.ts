import db from "../libs/db";

console.log("Deleting table users");
await db`
    DROP TABLE IF EXISTS users;
`;
console.log("Table users deleted successfully");

console.log("Creating table users");
await db`
    CREATE TABLE IF NOT EXISTS users (
        id BIGINT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );
`;
console.log("Table users created successfully");