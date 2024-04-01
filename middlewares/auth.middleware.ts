import { Context, Next } from "hono";
import client from "../libs/redis";

export const authMiddleware = async (ctx: Context, next: Next) => {
    const token = ctx.req.header('Authorization')?.split(' ')[1];
    const payload = token?.split('.')[1];

    const decoded = Buffer.from(payload ?? '', 'base64').toString('utf-8');
    const user = JSON.parse(decoded);

    const storedToken = await client.get(user.id);

    if (token !== storedToken) {
        return ctx.json({ error: 'Unauthorized Session' }, 401);
    }

    ctx.set('user_id', user.id);
    
    await next()
}