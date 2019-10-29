import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private successMasssage = '';
  private negativeMessage = '';

  constructor() { }

  /**
   * Gets success message
   * @returns  
   */
  getSuccessMessage() {
    return this.successMasssage;
  }

  /**
   * Gets negative message
   * @returns  
   */
  getNegativeMessage() {
    return this.negativeMessage;
  }

  /**
   * Sets success message
   * @param message 
   */
  setSuccessMessage(message: string) {
    this.successMasssage = message;
  }

  /**
   * Sets negative message
   * @param message 
   */
  setNegativeMessage(message: string) {
    this.negativeMessage = message;
  }

  /**
   * Resets messages
   */
  resetMessages() {
    this.successMasssage = '';
    this.negativeMessage = '';
  }

}
