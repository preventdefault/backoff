import { strict } from "assert";
import { backoff, exponential, linear } from "../dist/index.js";

function predicate({ retry, delay }) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(retry > 2), 1000);
	});
}

const { start: startExponential } = backoff({
	predicate,
	maxRetries: 5,
	strategy: exponential({ jitter: false }),
});

const { start: startLinear } = backoff({
	predicate,
	maxRetries: 5,
	strategy: linear({ jitter: false }),
});

startExponential().then((arg) =>
	strict.deepStrictEqual(arg, {
		retry: 3,
		success: true,
		maxRetries: 5,
		delay: 40,
		stopped: false,
	})
);

startLinear().then((arg) =>
	strict.deepStrictEqual(arg, {
		retry: 3,
		success: true,
		maxRetries: 5,
		delay: 30,
		stopped: false,
	})
);
