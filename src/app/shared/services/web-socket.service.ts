import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: any;
  uri = 'https://maid-cafe.ch';

  constructor() {
    this.socket = io(this.uri);
  }

  setUri(param: string) {
    this.uri = 'https://maid-cafe.ch/' + param;
  }

  listen(eventName: string) {
    return new Observable((subcriber) => {
      this.socket.on(eventName, data => {
        subcriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
