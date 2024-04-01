import db from "../libs/db";
import client from "../libs/redis";

import { SnowflakeId } from "hyperflake";
import { genSaltSync, compareSync,hashSync } from "bcrypt-edge";
import { sign } from 'hono/jwt'

interface IUserRegistration {
    username: string;
    password: string;
}

interface IUserLogin {
    username: string;
    password: string;
}

const idGen = SnowflakeId()

export class Task1Service {
    public static readonly register = async (data: IUserRegistration) => {
        if (!data.username || !data.password) {
            throw new Error("Missing required fields");
        }
        const id = idGen.generate();
        const salt = genSaltSync(8);
        const hash = hashSync(data.password, salt);
    
        await db`
            INSERT INTO users (id, username, password)
            VALUES (${id}, ${data.username}, ${hash})
        `;
    
        return id;
    };
    
    public static readonly login = async (data: IUserLogin) => {
        if (!data.username || !data.password) {
            throw new Error("Missing required fields");
        }
        const user = await db`
            SELECT * FROM users
            WHERE username = ${data.username}
        ` as { id: string, username: string, password: string }[];
    
        if (!user) {
            throw new Error("User not found");
        }
    
        if (!compareSync(data.password, user[0].password)) {
            throw new Error("Invalid password");
        }
    
        const token = await sign({ id: user[0].id }, process.env.JWT_SECRET, 'HS256');
        
        await client.set(user[0].id, token);
    
        return token;
    };
    
    public static readonly logout = async (id: string) => {
        await client.del(id);
    }

    public static readonly whoami = async (id: string) => {
        const user = await db`
            SELECT id, username FROM users
            WHERE id = ${id}
        ` as { id: string, username: string, password: string }[];

        if (!user) {
            throw new Error("User not found");
        }
    
        return user[0];
    }
}
