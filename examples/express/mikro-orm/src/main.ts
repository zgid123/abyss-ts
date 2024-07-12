import { ExpressApplication } from '@abyss.ts/express-runner';
import { MikroOrmConfiguration, MikroOrmMiddleware } from '@abyss.ts/mikro-orm';

ExpressApplication.create()
  .useBodyParser()
  .usePort({
    port: 4_000,
    isStrict: true,
  })
  .useConfiguration(MikroOrmConfiguration)
  .useMiddleware(MikroOrmMiddleware)
  .run();
