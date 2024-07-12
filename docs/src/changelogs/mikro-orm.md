# Changelogs

## 0.0.1

- create `MikroOrmConfiguration` using `AbyssalConfiguration` to init `MikroOrm` and register `orm` and `em` to IoC
- create `MikroOrmMiddleware` using `AbyssalMiddleware` to create `MikroOrm`'s context per request
