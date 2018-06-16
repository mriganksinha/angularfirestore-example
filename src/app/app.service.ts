import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  messages: string[] = [];

  addMessage(message: string)
  {
    this.messages.push(message);
  }

  clearMessage()
  {
    this.messages = [];
  }

  constructor() { }
}
