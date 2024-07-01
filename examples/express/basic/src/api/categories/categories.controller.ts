import { Get, Inject, Controller } from '@abyss.ts/express-runner';

import { GetCategoryService } from './services/GetCategoryService';

@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject(GetCategoryService)
    private readonly getCategoryService: GetCategoryService,
  ) {}

  @Get()
  index() {
    return this.getCategoryService.call();
  }
}
