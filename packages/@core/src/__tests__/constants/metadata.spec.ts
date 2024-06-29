import { describe, expect, it } from 'vitest';

import { ACTIONS, CONTROLLER, PARAMS } from '../../constants/metadata';

describe('[constants]: metadata', () => {
  it('has CONTROLLER as __controllerMetadata__', () => {
    expect(CONTROLLER).toBe('__controllerMetadata__');
  });

  it('has ACTIONS as __actionsMetadata__', () => {
    expect(ACTIONS).toBe('__actionsMetadata__');
  });

  it('has PARAMS as __actionParamsMetadata__', () => {
    expect(PARAMS).toBe('__actionParamsMetadata__');
  });
});
