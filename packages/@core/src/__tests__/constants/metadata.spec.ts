import { describe, expect, it } from 'vitest';

import {
  INJECT,
  PARAMS,
  ACTIONS,
  INJECTABLE,
  CONTROLLER,
  INJECTABLE_IDENTITY,
} from '../../constants/metadata';

describe('[constants]: metadata', () => {
  it('has CONTROLLER as __controllerMetadata__', () => {
    expect(CONTROLLER).toBe(Symbol.for('__controllerMetadata__'));
  });

  it('has ACTIONS as __actionsMetadata__', () => {
    expect(ACTIONS).toBe(Symbol.for('__actionsMetadata__'));
  });

  it('has PARAMS as __actionParamsMetadata__', () => {
    expect(PARAMS).toBe(Symbol.for('__actionParamsMetadata__'));
  });

  it('has INJECT as __injectMetadata__', () => {
    expect(INJECT).toBe(Symbol.for('__injectMetadata__'));
  });

  it('has INJECTABLE as __injectableMetadata__', () => {
    expect(INJECTABLE).toBe(Symbol.for('__injectableMetadata__'));
  });

  it('has INJECTABLE_IDENTITY as __injectableIdentity__', () => {
    expect(INJECTABLE_IDENTITY).toBe(Symbol.for('__injectableIdentity__'));
  });
});
