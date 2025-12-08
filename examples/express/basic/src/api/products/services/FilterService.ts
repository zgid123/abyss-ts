import { Injectable } from '@abyss.ts/express-runner';
import { nanoid } from 'nanoid';

@Injectable()
export class FilterService {
  public call() {
    return [
      {
        id: nanoid(),
        name: 'Shirt',
      },
    ];
  }
}
