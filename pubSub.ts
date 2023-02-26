class PubSub {
  subscribers: { [key: string]: [(data: any) => void] };

  constructor() {
    this.subscribers = {};
  }

  subscribe(event: string, callback: (data: any) => void) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [callback];
    } else {
      this.subscribers[event].push(callback);
    }
  }

  publish(event: string, data: any) {
    if (!this.subscribers[event]) {
      console.error("No subscriber for event:" + event);
      return;
    }
    this.subscribers[event].forEach((callBack) => callBack(data));
  }
}

const broker = new PubSub();
export { broker as pubSub };
