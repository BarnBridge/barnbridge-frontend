import EventEmitter from 'wolfy87-eventemitter';

export default class ManagedEntity {
  private readonly _event: EventEmitter;

  constructor() {
    this._event = new EventEmitter();
  }

  get event(): EventEmitter {
    return this._event;
  }

  onDataUpdate = (listener: Function): Function => {
    this._event.on('data:update', listener);

    return () => {
      return this._event.off('data:update', listener);
    };
  };

  emitDataUpdate = () => {
    this._event?.emit('data:update');
  };
}
