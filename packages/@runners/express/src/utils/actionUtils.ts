import { getActionParamMetadata, type IActionParamProps } from '@abyss.ts/core';

import { asyncStorage } from '../asyncStorage';

import type { IRequest } from '../interface';

function extractData(request: IRequest, param: IActionParamProps): TAny {
  const { type, extractor } = param;

  switch (type) {
    case 'body': {
      return extractor ? request.body[extractor] : request.body;
    }
    case 'query': {
      return extractor ? request.query[extractor] : request.query;
    }
    case 'param': {
      return extractor ? request.params[extractor] : request.params;
    }
    case 'context': {
      return asyncStorage.get();
    }
    default: {
      return request;
    }
  }
}

interface IMapParametersParams {
  controller: TAny;
  request: IRequest;
  propertyKey: string | symbol;
}

export function mapParameters({
  request,
  controller,
  propertyKey,
}: IMapParametersParams): TAny[] {
  const params = getActionParamMetadata({
    controller,
    propertyKey,
  });

  return params.map((param) => {
    return extractData(request, param);
  });
}
