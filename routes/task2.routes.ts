import { Hono } from 'hono';
import { Task2Controller } from '../controllers/task2.controller';

const route = new Hono();

route.get('/fetch', Task2Controller.fetchData);

export default route;