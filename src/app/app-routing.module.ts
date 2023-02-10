import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './modules/pages/components/login-page/login-page.component';
import { LayoutComponent } from './modules/layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () =>
      import('src/app/modules/layout/layout-routing.module').then(
        (m) => m.LayoutRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
