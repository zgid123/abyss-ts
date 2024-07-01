import { nanoid } from 'nanoid';
import { Injectable } from '@abyss.ts/express-runner';

@Injectable()
export class GetCategoryService {
  public call() {
    return {
      id: nanoid(),
      name: 'Clothes',
    };
  }
}
