import { Injectable } from '@abyss.ts/express-runner';
import { InjectRepository } from '@abyss.ts/mikro-orm';

import type { EntityRepository } from '@mikro-orm/postgresql';

import { Product } from '../../../db/models/Product';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
  ) {}

  public call() {
    return this.productRepository.findAll();
  }
}
