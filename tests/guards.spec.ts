import * as Guards from '../src/guards';
import messages from '../src/messages';

describe('Guards', () => {
  it('should throw 404 error', () => {
    const guard = Guards.NotFound();
    expect(() => guard()).toThrow(messages.NOT_FOUND);
  });

  it('should throw custom 404 error', () => {
    const guard = Guards.NotFound('Not found');
    expect(() => guard()).toThrow('Not found');
  });

  it('should throw 405 error', () => {
    const guard = Guards.MethodNotAllowed();
    expect(() => guard()).toThrow(messages.METHOD_NOT_ALLOWED);
  });

  it('should throw custom 405 error', () => {
    const guard = Guards.MethodNotAllowed('Method not allowed');
    expect(() => guard()).toThrow('Method not allowed');
  });
});
