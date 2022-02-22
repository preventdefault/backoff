# Backoff

## Strategies

Basically a strategy calculates the delay that should be applied between
retries.

In this library it is a simple function that returns an object with a `next` and
a `reset` function.

Every time you call the `next` function, it will return a promise that resolves
after a calculated delay.

### Exponential

### Linear

## Backoff

## Usage

## Development

### Run Unit Tests

```sh
deno test
```

Generate coverage report

```sh
deno test --coverage=coverage
```

Display coverage

```sh
deno coverage coverage
```
