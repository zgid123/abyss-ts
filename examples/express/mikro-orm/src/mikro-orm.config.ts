import pluralize from 'pluralize-esm';
import { SeedManager } from '@mikro-orm/seeder';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import {
  defineConfig,
  UnderscoreNamingStrategy,
  type Constructor,
  type EventSubscriber,
  type MikroORMOptions,
} from '@mikro-orm/core';

class MikroNamingStrategy extends UnderscoreNamingStrategy {
  classToTableName(entityName: string, isPlural = true): string {
    return this.toTableName(entityName, isPlural);
  }

  joinKeyColumnName(entityName: string, referencedColumnName?: string): string {
    return `${this.classToTableName(entityName, false)}_${
      referencedColumnName || this.referenceColumnName()
    }`;
  }

  protected toTableName(entityName: string, isPlural = true): string {
    const tableName = entityName
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .toLowerCase();

    if (!isPlural) {
      return tableName;
    }

    return pluralize.plural(tableName);
  }
}

interface IConfigParams {
  allowGlobalContext?: boolean;
  dynamicDatabaseName?: boolean;
  subscribers?: (EventSubscriber | Constructor<EventSubscriber>)[];
}

function config({
  subscribers,
  allowGlobalContext,
  dynamicDatabaseName = false,
}: IConfigParams = {}): Partial<MikroORMOptions> {
  let dbName = process.env.DB_NAME || 'abyss_express_mikro_orm_development';

  if (dynamicDatabaseName) {
    dbName = `abyss_express_mikro_orm_test_${(
      new Date().getTime() +
      parseInt(Math.random().toString().replace('.', ''), 10)
    ).toString()}`;
  }

  return defineConfig({
    dbName,
    subscribers,
    allowGlobalContext,
    driver: PostgreSqlDriver,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    entities: ['./dist/db/models'],
    entitiesTs: ['./src/db/models'],
    password: process.env.DB_PASSWORD,
    extensions: [Migrator, SeedManager],
    namingStrategy: MikroNamingStrategy,
    dynamicImportProvider: (id) => import(id),
    port: parseInt(process.env.DB_PORT || '', 10),
    debug: process.env.NODE_ENV === 'development',
    seeder: {
      glob: '!(*.d).{js,ts}',
      path: './dist/db/seeds',
      pathTs: './src/db/seeds',
    },
    migrations: {
      path: './dist/db/migrations',
      pathTs: './src/db/migrations',
    },
  });
}

const mikroConfig = config();

export default mikroConfig;
