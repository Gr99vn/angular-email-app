import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IMessage } from 'src/app/messages.service';

@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.scss']
})
export class EmailDetailComponent implements OnInit, OnChanges {

 @Input() message?: IMessage;
 messageBodyAsHTML: string = '';
  constructor() { }

  ngOnInit(): void {
    
  }
  ngOnChanges() {
    this.messageBodyAsHTML = this.message?.body.split(/\n/).map(p => `<p>${p}</p>`).join('\n')!;
  }
}
