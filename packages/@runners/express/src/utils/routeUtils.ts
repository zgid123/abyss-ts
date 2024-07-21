import { Router } from 'express';
import {
  combine,
  AbyssalException,
  getFromIoCContainer,
  getControllerMetadata,
  getInjectParamMetadata,
  getControllerActionMetadata,
} from '@abyss.ts/core';

import { mapParameters } from './actionUtils';

import type { IRequest } from '../interface';

export function mapRoutes(controllers: TAny[]): [string[], Router] {
  console.log('Initializing routes...');

  const routes: string[] = [];
  const router = Router();

  for (const controller of controllers) {
    const { route } = getControllerMetadata(controller);
    const actions = getControllerActionMetadata(controller);
    const injects = getInjectParamMetadata({ target: controller });

    const injections = injects.map(({ extractor }) => {
      return getFromIoCContainer(extractor);
    });

    const controllerInstance = new controller(...injections);

    for (const action of actions) {
      const { exec, httpMethod, route: actionRoute, propertyKey } = action;
      const httpRoute = `/${combine({ joinWith: '/' }, route, actionRoute)}`;

      routes.push(
        combine({ joinWith: ' ' }, httpMethod.toUpperCase(), httpRoute),
      );

      router[httpMethod](httpRoute, async (req, res, next) => {
        const params = mapParameters({
          controller,
          propertyKey,
          request: req as IRequest,
        });

        try {
          const result = await exec.bind(controllerInstance)(...params);

          res.send(result);
        } catch (err) {
          let error = err;

          if (typeof err === 'string') {
            error = new AbyssalException(err);
          }

          next(error);
        }
      });
    }
  }

  console.log('Finish initializing routes!\n');

  return [routes, router];
}
