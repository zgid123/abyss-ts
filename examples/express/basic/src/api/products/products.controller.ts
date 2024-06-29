import { nanoid } from 'nanoid';
import { Get, Query, Request, Controller } from '@abyss.ts/express-runner';

@Controller('products')
export class ProductsController {
  @Get()
  index(@Query('test') queryParam: string, @Request() request: TAny) {
    console.log('request', request);
    console.log('queryParam', queryParam);

    return [
      {
        id: nanoid(),
        name: 'Shirt',
      },
    ];
  }
}
