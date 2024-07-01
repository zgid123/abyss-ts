import { nanoid } from 'nanoid';
import { Injectable } from '@abyss.ts/express-runner';

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
