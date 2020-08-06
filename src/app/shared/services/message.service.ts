import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { __values } from 'tslib';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
   successMasssage = new EventEmitter<string>();
   negativeMessage = new EventEmitter<string>();

  constructor() { }

  /**
   * Gets success message
   * @returns  
   */
  getSuccessMessage(){
    var message:string = "";
    this.successMasssage.subscribe(value => {
      message = value;
    });
    return message;
  }

  /**
   * Gets negative message
   * @returns  
   */
  getNegativeMessage() {
    var message:string = "";
    this.negativeMessage.subscribe(value => {
      message = value;
    });
    return message;
  }

  /**
   * Sets success message
   * @param message 
   */
  setSuccessMessage(message: string) {
    this.resetMessages();
    this.successMasssage.emit(message);
  }

  /**
   * Sets negative message
   * @param message 
   */
  setNegativeMessage(message: string) {
    this.resetMessages();
    this.negativeMessage.emit(message);
  }

  /**
   * Resets messages
   */
  resetMessages() {
    this.successMasssage.emit('');
    this.negativeMessage.emit('');
  }

}
