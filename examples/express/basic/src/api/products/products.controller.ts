import {
  Get,
  Query,
  Inject,
  Request,
  Controller,
} from '@abyss.ts/express-runner';

import { FilterService } from './services/FilterService';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(FilterService) private readonly filterService: FilterService,
  ) {}

  @Get()
  index(@Query('test') queryParam: string, @Request() request: TAny) {
    console.log('request', request);
    console.log('queryParam', queryParam);

    return this.filterService.call();
  }
}
