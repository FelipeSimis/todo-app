import { Router } from 'express';

import authenticate from '../middlewares/authenticate';

import TodosController from '../controllers/TodosController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const routes = Router();

routes.get('/todos', authenticate, TodosController.index);
routes.post('/todos', authenticate, TodosController.create);
routes.patch('/todos/:id', authenticate, TodosController.complete);
routes.delete('/todos/:id', authenticate, TodosController.delete);

routes.post('/users', UsersController.create);
routes.get('/users', UsersController.index);

routes.post('/auth', AuthController.authenticate);

export default routes;
