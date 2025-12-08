import type { AbyssalContext } from '@abyss.ts/core';
import type { NextFunction, Request, Response } from 'express';

export interface IRequest extends Request {
  executionId: string;
}

export interface IResponse extends Response {}

export interface INext extends NextFunction {}

export interface IContext extends AbyssalContext<IRequest, IResponse> {}
