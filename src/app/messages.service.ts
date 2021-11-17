import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import MESSAGES from "../assets/messages.json";

export interface IName {
  last: string,
  first: string
}

export interface IMessage {
  folder: string,
  body: string,
  subject: string,
  from: string,
  to: string,
  date: string,
  senderName: IName,
  corpus: string,
  read?: boolean,
  _id: string
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages: IMessage[] = [];

  constructor() { 
    // const defaultMessages: IMessage[] = MESSAGES;
    this.messages = JSON.parse(localStorage.getItem("MESSAGES")!);
    console.log(this.messages, "init db");
    if (!this.messages) {
      
      localStorage.setItem("MESSAGES", JSON.stringify(MESSAGES));
    }
  }

  getMessageByFolder(folder: string): Observable<IMessage[]> {
    let messagesResult: IMessage[] = [];
    messagesResult = this.messages.filter(message => message.folder === folder);
    return of(messagesResult).pipe(delay(50));
  }

  readMessage(messageId: string): Observable<boolean> {
    let isChange = false;
    this.messages.forEach(message => {
      if (message._id === messageId) {
        message.read = true;
        isChange = true;
      }
    });
    if (isChange) {
      localStorage.setItem("MESSAGES", JSON.stringify(this.messages));
    }
    return of(true).pipe(delay(50));
  }
}
