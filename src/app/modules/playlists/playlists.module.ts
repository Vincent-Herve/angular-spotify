import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlaylistsCreateComponent } from './components/playlists-create/playlists-create.component';
import { PlaylistsDetailComponent } from './components/playlists-detail/playlists-detail.component';
import { PlaylistsListComponent } from './components/playlists-list/playlists-list.component';
import { CardModule } from 'primeng/card';
import { LayoutRoutingModule } from '../layout/layout-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const playlistsComponents = [
  PlaylistsListComponent,
  PlaylistsCreateComponent,
  PlaylistsDetailComponent,
];

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [...playlistsComponents],
  declarations: [...playlistsComponents],
  providers: [],
})
export class PlaylistsModule {}
