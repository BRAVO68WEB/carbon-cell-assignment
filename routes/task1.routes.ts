import { Hono } from 'hono';

import { Task1Controller } from '../controllers/task1.controller';

const route = new Hono();

route.post('/register', Task1Controller.register);
route.post('/login', Task1Controller.login);
route.get('/logout', Task1Controller.logout);

export default route;