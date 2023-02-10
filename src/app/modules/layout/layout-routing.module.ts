import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../pages/components/home-page/home-page.component';
import { PlaylistsCreatePageComponent } from '../pages/components/playlists-create-page/playlists-create-page.component';
import { PlaylistsDetailPageComponent } from '../pages/components/playlists-detail-page/playlists-detail-page.component';
import { PlaylistsPageComponent } from '../pages/components/playlists-page/playlists-page.component';
import { AuthGuard } from '../shared/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'playlists',
    component: PlaylistsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'playlists/create',
    component: PlaylistsCreatePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'playlists/:id/detail',
    component: PlaylistsDetailPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
