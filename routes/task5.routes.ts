import { Hono } from 'hono';

import { Task5Controller } from '../controllers/task5.controller';

const route = new Hono();

route.get('/balance/:account', Task5Controller.getAccountBalance);

export default route;