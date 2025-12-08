import { Controller, Get, Inject, Param } from '@abyss.ts/express-runner';

import { FilterService } from './services/FilterService';
import { FinderService } from './services/FinderService';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(FilterService) private readonly filterService: FilterService,
    @Inject(FinderService) private readonly finderService: FinderService,
  ) {}

  @Get()
  async index() {
    return this.filterService.call();
  }

  @Get(':id')
  async detail(@Param('id') id: number) {
    return this.finderService.call(id);
  }
}
