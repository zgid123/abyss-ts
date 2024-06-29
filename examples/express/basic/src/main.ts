import { ExpressApplication } from '@abyss.ts/express-runner';

ExpressApplication.create()
  .useBodyParser()
  .usePort({
    port: 4_000,
    isStrict: true,
  })
  .run();
