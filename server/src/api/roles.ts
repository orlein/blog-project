import { Request, Response, NextFunction, response } from 'express';
import { Util, ResponseBody, SUCCESSFUL } from '../common';
import { Role } from '../models/Role';

export abstract class RolesController {

  /**
   * GET /api/v1/roles?page={page}&perPage={perPage}
   */
  public static getAllRoles = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const page = Util.safeParse(req.query.page);
      const perPage = Util.safeParse(req.query.perPage);
      const roles = await Role.findAll({ offset: page * perPage, limit: perPage });
      const responseBody = new ResponseBody(SUCCESSFUL, roles);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * POST /api/v1/roles
   */
  public static createRole = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const role = await Role.create<Role>(req.body);
      await role.save();
      const responseBody = new ResponseBody(SUCCESSFUL, role);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * PATCH /api/v1/roles/{id}
   */
  public static editRole = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const id = Util.safeParse(req.params.id);
      const result = await Role.update(req.body, {where: { id }});
      const responseBody = new ResponseBody(SUCCESSFUL, result);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * DELETE /api/v1/roles/{id}
   */
  public static deleteRole = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const id = Util.safeParse(req.params.id);
      const result = await Role.update({ toBeDeleted: true }, {where: { id }});
      const responseBody = new ResponseBody(SUCCESSFUL, result);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);      
    }
  }
}
