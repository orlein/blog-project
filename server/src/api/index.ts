import { Router, Request, Response, NextFunction } from 'express';
import { UsersController } from './users';
const router = Router();

router.post('/v1/login', UsersController.login);
// router.get('/v1/users', UsersController.getUsers);
router.post('/v1/users', UsersController.registerSingleUser);
/** 
 * GET /api/v1/users?page={page}&perPage={perPage}
 * */ 
router.get('/v1/users', UsersController.getUsers);
router.get('/v1/users/:id', UsersController.getSingleUser);

export default router;