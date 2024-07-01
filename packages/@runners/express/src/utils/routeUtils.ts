import { Router } from 'express';
import {
  combine,
  getFromIoCContainer,
  getControllerMetadata,
  getInjectParamMetadata,
  getControllerActionMetadata,
} from '@abyss.ts/core';

import { mapParameters } from './actionUtils';

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

      router[httpMethod](httpRoute, (req, res) => {
        const params = mapParameters({
          controller,
          propertyKey,
          request: req,
        });

        res.send(exec.bind(controllerInstance)(...params));
      });
    }
  }

  console.log('Finish initializing routes!\n');

  return [routes, router];
}