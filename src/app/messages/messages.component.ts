import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';
import FOLDERS from "../../assets/folders.json";
import { IMessage, MessagesService } from '../messages.service';

export interface IFolder {
  _id: string,
  columns: string[],
  actions: string[]
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewInit {

  folders: IFolder[] = FOLDERS;
  folderIds: string[] = [];
  activeFolder?: IFolder;
  activeFolderMessages: IMessage[] = [];
  selectedMessage?: IMessage;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.folderIds = this.folders.map(folder => folder._id);
    this.activatedRoute.paramMap.pipe(
      map(params => params.get("folderId")),
      tap(activeFolderId => this.activeFolder = this.folders.find(folder => folder._id === activeFolderId)),
      switchMap(activeFolderId => this.messagesService.getMessageByFolder(activeFolderId!))
    ).subscribe(messages => {this.activeFolderMessages = messages});
  }

  ngAfterViewInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(params => params.get("emailId"))
    ).subscribe(emailId => {
      this.selectedMessage = this.activeFolderMessages.find(message => message._id === emailId);
    });
  }

  readMessage(messageId: string) {
    this.messagesService.readMessage(messageId).subscribe(
      result => {
        if (result) {
          this.activeFolderMessages.forEach(message => {
            if (message._id === messageId) {
              message.read = true;
            }
          });
        }
      }
    );
  }
}
