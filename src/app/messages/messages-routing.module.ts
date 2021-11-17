import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { MessagesComponent } from './messages.component';

const routes: Routes = [
  {
    path: ':folderId',
    children: [
      { path: '', component: MessagesComponent },
      { path: ':emailId', component: MessagesComponent },
    ],
  },
  { path: '', redirectTo: 'inbox', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
