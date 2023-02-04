import { httpRequestAuthInterceptor } from './httpRequestAuthInterceptor';
import { localStorageMock } from '../../tests/mocks/localStorageMock';
import { oktaAuthInstanceMock } from '../../tests/mocks/oktaAuthInstanceMock';

describe('httpRequestAuthInterceptor', () => {
  let originLocalStorage;
  beforeAll(() => {
    originLocalStorage = window.localStorage;
    
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  afterAll(() => {
    localStorageMock.clear();
    Object.defineProperty(window, 'localStorage', { value: originLocalStorage });
  });

  it('should add bearer token to request header', async () => {
    const interceptor = httpRequestAuthInterceptor(oktaAuthInstanceMock);
    const config: {headers?: any} = {};
    const token = 'TEST_TOKEN';

    const getAuthToken = jest.spyOn(oktaAuthInstanceMock, 'getAccessToken').mockReturnValue(token);

    await interceptor(config);

    expect(getAuthToken).toBeCalled();
    expect(config.headers).not.toBe(undefined);
    expect(config.headers.Authorization).not.toBe(undefined);
    expect(config.headers.Authorization).toBe(`Bearer ${token}`);
  });

  it('should override headers by user config', async () => {
    const interceptor = httpRequestAuthInterceptor(oktaAuthInstanceMock);
    const token = 'TEST_TOKEN';
    const getAuthToken = jest.spyOn(oktaAuthInstanceMock, 'getAccessToken').mockReturnValue(token);
    const config: {headers?: any} = {
      headers: {
        Authorization: 'Bearer MY_NEW_TEST_TOKEN',
        'Content-Type': 'multipart/form-data',
      },
    };

    await interceptor(config);

    expect(getAuthToken).toBeCalled();
    expect(config.headers).not.toBe(undefined);
    expect(config.headers.Authorization).not.toBe(undefined);
    expect(config.headers.Authorization).toBe(config.headers.Authorization);
    expect(config.headers['Content-Type']).toBe(config.headers['Content-Type']);
  });
});
