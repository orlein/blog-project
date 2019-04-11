import { Request, Response, NextFunction } from 'express';
import { Util, ResponseBody, SUCCESSFUL } from '../common';
import { Channel } from '../models/Channel';

export abstract class ChannelsController {
  /**
   * GET /api/v1/channels?page={page}&perPage={perPage}
   */
  public static getAllChannels = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const page = Util.safeParse(req.query.page);
      const perPage = Util.safeParse(req.query.perPage);
      const channels = await Channel.findAll({ offset: page * perPage, limit: perPage });
      const responseBody = new ResponseBody(SUCCESSFUL, channels);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * GET /api/v1/channels/{id}
   */
  public static getSingleChannel = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const id = Util.safeParse(req.query.id);
      const channel = await Channel.findOne({where : { id }});
      const responseBody = new ResponseBody(SUCCESSFUL, channel);
      return res.status(200).send(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * POST /api/v1/channels
   */
  public static createSingleChannel = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const channel = await Channel.create<Channel>(req.body);
      await channel.save();
      const responseBody = new ResponseBody(SUCCESSFUL, channel);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }

  /**
   * PATCH /api/v1/channels/{id}
   */
  public static editChannel = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const id = Util.safeParse(req.params.id);
      const result = await Channel.update(req.body, { where: { id }});
      const responseBody = new ResponseBody(SUCCESSFUL, result);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }
  
  /**
   * DELETE /api/v1/channels/{id}
   */
  public static deleteChannel = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    try {
      const id = Util.safeParse(req.params.id);
      const result = await Channel.update({ toBeDeleted: true }, { where: { id }});
      const responseBody = new ResponseBody(SUCCESSFUL, result);
      return res.status(200).json(responseBody);
    } catch(e) {
      next(e);
    }
  }
}