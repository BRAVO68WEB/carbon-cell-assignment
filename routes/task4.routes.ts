import { Hono } from 'hono';
import { Task1Controller } from '../controllers/task1.controller';

const route = new Hono();

route.get('/secure', (ctx) => {
    return ctx.text('Hello, this is a secure channel.');
});

route.get('/whoami', Task1Controller.whoami)

export default route;