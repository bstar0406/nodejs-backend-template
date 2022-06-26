import { Request, Response, NextFunction } from 'express'

export function unCoughtErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.end({ error: err })
}

export function apiErrorHandler(
  err: any,
  req: Request,
  res: Response,
  message: string,
) {
  const error: object = { Message: message, Request: req, Stack: err }
  res.json({ 
    "success": false,
    "name": "Request Error",
    "message": message 
  })
}