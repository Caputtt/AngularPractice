import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";



const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()  => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'tickets',
    loadChildren: ()  => import('./pages/tickets/tickets.module').then(m => m.TicketsModule)
  },
  {
    path: 'settings',
    loadChildren: ()  => import('./pages/settings/settings.module').then(m => m.SettingsModule)
  },
  { path: '**',
   redirectTo: 'auth'
  }
];

//все общие правила должны располагаться внизу, тк ангулар пошагово проходит пути

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }