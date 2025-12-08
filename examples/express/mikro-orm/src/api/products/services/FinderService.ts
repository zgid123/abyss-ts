import { Injectable } from '@abyss.ts/express-runner';
import { InjectRepository } from '@abyss.ts/mikro-orm';
import type { EntityRepository } from '@mikro-orm/postgresql';

import { Product } from '../../../db/models/Product';

@Injectable()
export class FinderService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
  ) {}

  public call(id: number) {
    return this.productRepository.findOneOrFail({
      id,
    });
  }
}
