import { describe, expect, it } from 'vitest';

import {
  INJECT,
  PARAMS,
  ACTIONS,
  INJECTABLE,
  CONTROLLER,
  IOC_CONTAINER,
} from '../../constants/metadata';

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

  it('has INJECT as __injectMetadata__', () => {
    expect(INJECT).toBe('__injectMetadata__');
  });

  it('has INJECTABLE as __injectableMetadata__', () => {
    expect(INJECTABLE).toBe('__injectableMetadata__');
  });

  it('has IOC_CONTAINER as __iocContainer__', () => {
    expect(IOC_CONTAINER).toBe('__iocContainer__');
  });
});
