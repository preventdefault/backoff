# Backoff

## Motivation

At the end of 2020, I had the pleasure of working with the KafkaJS library (in
our company we have started moving to an event-driven architecture) and I read
about the iteration mechanism they have implemented.
(https://kafka.js.org/docs/retry-detailed).

I thought: what a nice pattern, very interesting, i should keep this in mind.

A few days later I was playing around with DynamoDB a bit and wanted to know
something about error handling and came across this post:
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.Errors.html#Programming.Errors.RetryAndBackoff

I realized that both articles are talking about the same. It seems that this is
an important pattern, that i don't know yet, to provide some kind of failsafe
operations.

So I decided to learn this mechanism by implementing it.

The result is this library.

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

> https://blog.sindresorhus.com/get-ready-for-esm-aa53530b3f77
