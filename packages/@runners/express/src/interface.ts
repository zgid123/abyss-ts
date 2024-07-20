import type { AbyssalContext } from '@abyss.ts/core';
import type { Request, Response, NextFunction } from 'express';

export interface IRequest extends Request {
  executionId: string;
}

export interface IResponse extends Response {}

export interface INext extends NextFunction {}

export interface IContext extends AbyssalContext<IRequest, IResponse> {}
