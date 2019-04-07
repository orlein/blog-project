import { Request, Response, NextFunction } from 'express';

export abstract class ChannelsController {
  /**
   * GET /api/v1/channels?page={page}&perPage={perPage}
   */
  public static getAllChannels = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('get all channels by page');
  }

  /**
   * GET /api/v1/channels?page={page}&perPage={perPage}
   */
  public static getSingleChannel = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('get all channels by page');
  }

  /**
   * PATCH /api/v1/channels/{id}
   */
  public static editChannel = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('get all channels by page');
  }
  
  /**
   * DELETE /api/v1/channels/{id}
   */
  public static deleteChannel = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> =>{
    return res.status(200).send('get all channels by page');
  }
}