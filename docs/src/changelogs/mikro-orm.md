# Changelogs

## 0.0.2

- change peer dependency version of `@mikro-orm/core` to `^6.0.0`

**Full Changelog**: https://github.com/zgid123/abyss-ts/compare/mikro-orm@0.0.1...mikro-orm@0.0.2

## 0.0.1

- create `MikroOrmConfiguration` using `AbyssalConfiguration` to init `MikroOrm` and register `orm` and `em` to IoC
- create `MikroOrmMiddleware` using `AbyssalMiddleware` to create `MikroOrm`'s context per request
