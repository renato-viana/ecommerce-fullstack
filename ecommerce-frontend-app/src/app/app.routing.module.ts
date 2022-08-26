import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { IsLoggedInGuard } from './shared/guards/is-logged-in/is-logged-in.guard';
import { IsLoggedOutGuard } from './shared/guards/is-logged-out/is-logged-out.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/logged-in/logged-in.module').then(m => m.LoggedInModule),
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/logged-in/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [IsLoggedOutGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
