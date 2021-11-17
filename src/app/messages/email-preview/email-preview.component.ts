import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMessage } from 'src/app/messages.service';

@Component({
  selector: 'app-email-preview',
  templateUrl: './email-preview.component.html',
  styleUrls: ['./email-preview.component.scss']
})
export class EmailPreviewComponent implements OnInit, OnChanges {

  @Input() columns?: string[];
  @Input() activeFolderId?: string;
  @Input() messages: IMessage[] = [];
  selectedMessageId?: string;
  @Output() handleReadMessage = new EventEmitter<string>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.selectedMessageId = params.get("emailId")!;
    });
  }

  ngOnChanges(): void {

  }

  viewMessage(messageId: string) {
    this.router.navigate([`/messages/${this.activeFolderId}/${messageId}`]);
    this.handleReadMessage.emit(messageId);
  }
}
