export interface EventBus {
  publish: (event: string | Symbol, data?: any) => boolean;
  subscribe: (event: string | Symbol, callback: (msg: string, data: any) => void) => string,
  subscribeOnce: (event: string | Symbol, callback: (msg: string, data: any) => void) => string,
  unsubscribe: (token: string) => void,
}
