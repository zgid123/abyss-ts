import { Get, Inject, Controller } from '@abyss.ts/express-runner';

import { FilterService } from './services/FilterService';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(FilterService) private readonly filterService: FilterService,
  ) {}

  @Get()
  async index() {
    return this.filterService.call();
  }
}
