export const eventBusMock = {
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