import express from 'express';
import errorHandler, { Errors, Guards } from './index.js';

const app = express();

// Valid query
app.get('/ok', async (req, res) => {
  res.send({ data: 'OK' });
});

// Operational error
app.get('/protected', async (req, res) => {
  // Throw unauthorized error
  throw Errors.Unauthorized();
});

// Non operational error
app.get('/ko', async(req, res) => {
  // Throw error data is not defined
  res.send({ data });
});

// Throw error if route has not been handled (method does not exist)
app.all('/ok', Guards.MethodNotAllowed());

// Throw error if request has not been handled (not found)
app.use(Guards.NotFound());

// Register error handler
app.use(errorHandler());

app.listen(3000);
