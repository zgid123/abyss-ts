import { describe, expect, it, suite } from 'vitest';

import { IoC } from '../../core/IoC';
import { INJECTABLE } from '../../constants/metadata';
import { Injectable } from '../../decorators/injection';
import { mapInjections } from '../../utils/injectionUtils';
import { getFromIoCContainer } from '../../utils/metadataUtils';

describe('[utils]: injectionUtils', () => {
  suite('mapInjections', () => {
    it('register all injectable to IoC', () => {
      @Injectable()
      class AService {}

      @Injectable()
      class BService {}

      class CService {}

      mapInjections();

      expect(Reflect.getMetadata(INJECTABLE, IoC)).toBeUndefined();

      expect(getFromIoCContainer(AService)).toBeDefined();
      expect(getFromIoCContainer(BService)).toBeDefined();
      expect(getFromIoCContainer(CService)).toBeUndefined();
    });
  });
});
