import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';
import FOLDERS from '../../assets/folders.json';
import { IMessage, MessagesService } from '../messages.service';

export interface IFolder {
  _id: string;
  columns: string[];
  actions: string[];
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  folders: IFolder[] = FOLDERS;
  folderIds: string[] = [];
  activeFolder?: IFolder;
  activeFolderMessages: IMessage[] = [];
  emailId?: string;
  selectedMessage?: IMessage;

  constructor(
    private activatedRoute: ActivatedRoute,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.folderIds = this.folders.map((folder) => folder._id);
    this.activatedRoute.paramMap
      .pipe(
        tap((params) => (this.emailId = params.get('emailId')!)),
        map((params) => params.get('folderId')),
        tap(
          (activeFolderId) =>
            (this.activeFolder = this.folders.find(
              (folder) => folder._id === activeFolderId
            ))
        ),
        switchMap((activeFolderId) =>
          this.messagesService.getMessageByFolder(activeFolderId!)
        )
      )
      .subscribe((messages) => {
        console.log(messages);
        
        this.activeFolderMessages = messages;
        this.selectedMessage = this.activeFolderMessages.find(
          (message) => message._id === this.emailId
        );
      });
  }

  readMessage(messageId: string) {
    this.messagesService.readMessage(messageId).subscribe((result) => {
      if (result) {
        this.activeFolderMessages.forEach((message) => {
          if (message._id === messageId) {
            message.read = true;
          }
        });
      }
    });
  }
}
