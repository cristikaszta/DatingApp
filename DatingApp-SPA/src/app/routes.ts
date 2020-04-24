import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './Guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './Resolvers/member-detail.resolver';
import { MemberListResolver } from './Resolvers/member-list.resolver';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {// dummy route
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent, resolve: { users: MemberListResolver }},
      { path: 'members/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver }},
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListComponent },
    ]
  },
  // { path: 'members', component: MemberListComponent }, //, canActivate: [AuthGuard] },
  // { path: 'messages', component: MessagesComponent },
  // { path: 'lists', component: ListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
