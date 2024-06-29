import { getActionParamMetadata, type IActionParamProps } from '@abyss.ts/core';

import type { Request } from 'express';

function extractData(request: Request, param: IActionParamProps): TAny {
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
    default: {
      return request;
    }
  }
}

interface IMapParametersParams {
  request: Request;
  controller: TAny;
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
