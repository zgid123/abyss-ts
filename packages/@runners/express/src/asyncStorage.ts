import { AbyssalAsyncStorage } from '@abyss.ts/core';

import type { IRequest, IResponse } from './interface';

export const asyncStorage = new AbyssalAsyncStorage<IRequest, IResponse>();
