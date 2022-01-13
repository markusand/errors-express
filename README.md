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
import errorHandler, { Errors, Guards } from './index.js';

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

The base error class used by the package is HttpError. Send optional errorCode for error identification (useful for error translation).

`HttpError(statusCode, message, errorCode?)`

Default errors are provided by the package, just include optional message and errorCode.

```javascript
import { HttpError, Errors } from 'errors-express';

throw new HttpError(400, 'Invalid request', 'MISSING_PSWD');

throw Errors.NotFound();
throw Errors.Forbidden('You cannot do this');
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
app.all('/resource', Guards.MethodNotAllowed());
app.use(Guards.NotFound()),
```

Only **MethodNotAllowed** and **NotFound** are available.
