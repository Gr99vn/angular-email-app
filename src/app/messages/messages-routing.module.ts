import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { MessagesComponent } from './messages.component';

const routes: Routes = [
  
  {
    path: "",
    redirectTo: "inbox",
    pathMatch: "full"
  },
  {
    path: ":folderId",
    children: [
      {
        path: "",
        component: MessagesComponent
      },
      {
        path: ":emailId",
        component: MessagesComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
