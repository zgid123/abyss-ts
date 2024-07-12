import { Migration } from '@mikro-orm/migrations';

export class Migration20240710194429_CreateProducts extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "products" ("id" serial primary key, "created_at" timestamptz not null default CURRENT_TIMESTAMP, "updated_at" timestamptz not null default CURRENT_TIMESTAMP, "name" varchar(255) not null);',
    );
    this.addSql(
      'alter table "products" add constraint "products_name_unique" unique ("name");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "products" cascade;');
  }
}
