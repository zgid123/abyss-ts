import { AbyssalAsyncStorage } from '@abyss.ts/core';

import type { IRequest } from './interface';

export const asyncStorage = new AbyssalAsyncStorage<IRequest>();
