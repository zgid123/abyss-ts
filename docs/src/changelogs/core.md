# Changelogs

## 0.0.3

- add loadEnv method for class AbyssApplication to load .env
- create function to create custom metadata
- create context
- create AbyssalConfiguration and AbyssalMiddleware to create 3rd party and global middleware

**Full Changelog**: https://github.com/zgid123/abyss-ts/compare/core@0.0.2...core@0.0.3

## 0.0.2

- build simple ioc container for di

**Full Changelog**: https://github.com/zgid123/abyss-ts/compare/core@0.0.1...core@0.0.2

## 0.0.1

- create `Controller` decorator to create controller
- create http method decorators: `Get`, `Post`, `Put`, `Patch` and `Delete` to create action for controller
- create parameter decorator `Query` to inject query param to controller's action
- create parameter decorator `Body` to inject body param to controller's action
- create parameter decorator `Param` to inject param (e.g: `/:id`, `id` is a param) to controller's action
- create parameter decorator `Request` to inject request (e.g: Express's request) to controller's action
- create Core Application to build runner
