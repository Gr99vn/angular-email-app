import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFolder } from '../messages.component';

@Component({
  selector: 'app-email-box',
  templateUrl: './email-box.component.html',
  styleUrls: ['./email-box.component.scss']
})
export class EmailBoxComponent implements OnInit {
  
  @Input() folderIds?: string[];
  @Input() activeFolderId?: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
