import './helpers/env'

import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { showRoutes } from 'hono/dev';
import { jwt } from 'hono/jwt';
import { swaggerUI } from '@hono/swagger-ui'
import { serveStatic } from 'hono/bun'

import task1 from './routes/task1.routes';
import task2 from './routes/task2.routes';
import task4 from './routes/task4.routes';
import task5 from './routes/task5.routes';

import { authMiddleware } from './middlewares/auth.middleware';

const app = new Hono();

app.use(logger());
app.use(cors());

app.get(
    '/',
    (ctx) => {
        return ctx.text('Hello, Hono!');
    }
)

app.get('/health', ctx => {
    return ctx.text('OK!');
});

app.route('/task1', task1);
app.route('/task2', task2);
app.route('/task5', task5);

app.get(
    '/task3',
    swaggerUI({
        url: '/public/swagger.yaml',
    })
)

app.get(
    '/public/*',
    serveStatic({
        root: './',
        rewriteRequestPath: (path) => path.replace(/^\/public/, '/public')
    })
)

app.use(
    "*", 
    jwt({
        secret: process.env.JWT_SECRET,
        alg: 'HS256',
    })
)

app.use(
    "*",
    authMiddleware
)

app.route('/task4', task4);

showRoutes(app);

export default app;
