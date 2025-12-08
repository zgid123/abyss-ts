import { Injectable } from '@abyss.ts/express-runner';
import { nanoid } from 'nanoid';

@Injectable()
export class GetCategoryService {
  public call() {
    return {
      id: nanoid(),
      name: 'Clothes',
    };
  }
}
