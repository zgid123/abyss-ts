import { Entity, Property } from '@mikro-orm/core';

import { Base } from './Base';

@Entity()
export class Product extends Base {
  @Property({
    unique: true,
    type: 'varchar',
    nullable: false,
  })
  name: string;
}
