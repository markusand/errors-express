# Errors for Express

Easy error handling for Express APIs.

[![NPM](https://img.shields.io/npm/v/errors-express)](https://npmjs.org/package/errors-express)
[![NPM](https://img.shields.io/bundlephobia/minzip/errors-express)](https://npmjs.org/package/errors-express)
[![NPM](https://img.shields.io/npm/l/errors-express)](https://npmjs.org/package/errors-express)

## Installation

Install together with express

```bash
npm i express errors-express
```

## Usage

Import the error handler middleware and place it at the end of the middleware stack. Any error (operational or not) thrown by a controller is handled and sent to the client.

Use the handler with a callback to perform extra actions such as logging. Callback receives the error and the request object.

Use guards to return a custom error response after not found or not allowed methods requests.

```js
import express from 'express';
import errorHandler, { Errors, Guards } from 'errors-express';

const app = express();

app.get('/protected', async (req, res) => {
  throw Errors.Unauthorized('You must first sign in');
});

app.all('*', Guards.NotFound());

app.use(errorHandler((error, req) => {
  console.log(`[${req.method} ${req.url}] ${error.message}`);
}));

app.listen(process.env.PORT || 3000);
```

## Errors

The base error class used by the package is HttpError. Send optional error details, useful for providing context to error handling in frontend.

`HttpError(statusCode, message, details?)`

Details can be a string or an object that contains an error code, message and a free context object

Default errors are provided by the package, just include optional message and details.

```javascript
import { HttpError, Errors } from 'errors-express';

throw new HttpError(400, 'Invalid request', 'MISSING_PSWD');

throw Errors.NotFound();
throw Errors.Forbidden('You cannot do this');
throw Errors.TooManyRequests('You reached the maximum limit or requests', {
  code: 'REQUEST_LIMIT_REACHED';
  message: 'You reached the maximum limit or requests';
  ctx: {
    maxRequests: 5,
    retryIn: '1min',
  };
});
```

| Error | statusCode | Default message |
| --- | --- | --- |
| **BadRequest** | 400 | The request syntax is invalid |
| **Unauthorized** | 401 | The authentication credentials are invalid |
| **Forbidden** | 403 | You are not allowed to use this resource |
| **NotFound** | 404 | This resource does not exist |
| **MethodNotAllowed** | 405 | This method is not allowed for this resource |
| **Conflict** | 409 | There is a conflict with the current state of the resource |
| **Unprocessable** | 422 | The request is unprocessable
| **TooManyRequests** | 429 | The maximum number of requests has been exceeded
| **InternalServer** | 500 | An internal server error occurred

## Guards

Guards automatically return an error if none of the previous handlers are called.

```javascript
import { Guards } from 'errors-express';

app.get('/resource', ResourceController);

app.use(Guards.MethodNotAllowed());
app.use(Guards.NotFound()),
```

Only **MethodNotAllowed** and **NotFound** are available.
