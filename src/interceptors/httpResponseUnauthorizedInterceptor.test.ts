import { httpResponseUnauthorizedInterceptor } from './httpResponseUnauthorizedInterceptor';
import { EventBus } from '../../types';
import { EVENTBUS_EVENTS } from '../constants';
import { oktaAuthInstanceMock } from '../../tests/mocks/oktaAuthInstanceMock';

describe('httpResponseUnauthorizedInterceptor', () => {
  let eventBusMock: EventBus;
  beforeEach(() => {
    eventBusMock = {
      publish(event: string | Symbol, data: any): boolean {
        return false;
      },
      subscribe(event: string | Symbol, callback: (msg: string, data: any) => void): string {
        return '';
      },
      subscribeOnce(event: string | Symbol, callback: (msg: string, data: any) => void): string {
        return '';
      },
      unsubscribe(token: string): void {
      },
    };
  });

  it('should trigger event bus event when http request comes with 401', async () => {
    const publishSpy = jest.spyOn(eventBusMock, 'publish');

    const interceptor = httpResponseUnauthorizedInterceptor(oktaAuthInstanceMock);
    const error = { response: { status: 401 } };

    try {
      await interceptor(error);
    } catch (e) {
      expect(e).toEqual(error);
      expect(publishSpy).toBeCalledWith(EVENTBUS_EVENTS.authHttpUnauthorized, error);
    }
  });

  it('should not trigger event bus event when http request not comes with 401', async () => {
    const publishSpy = jest.spyOn(eventBusMock, 'publish');

    const interceptor = httpResponseUnauthorizedInterceptor(oktaAuthInstanceMock);
    const error = { response: { status: 403 } };

    try {
      await interceptor(error);
    } catch (e) {
      expect(e).toEqual(error);
      expect(publishSpy).not.toBeCalled();
    }
  });
});
