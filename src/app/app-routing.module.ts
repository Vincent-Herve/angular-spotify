import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/pages/components/home-page/home-page.component';
import { LoginPageComponent } from './modules/pages/components/login-page/login-page.component';
import { AuthGuard } from './modules/shared/guards/auth/auth.guard';
import { LayoutComponent } from './modules/shared/ui/layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
