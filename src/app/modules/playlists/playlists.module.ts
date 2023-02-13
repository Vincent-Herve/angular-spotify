import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlaylistsCreateComponent } from './components/playlists-create/playlists-create.component';
import { PlaylistsDetailComponent } from './components/playlists-detail/playlists-detail.component';
import { PlaylistsListComponent } from './components/playlists-list/playlists-list.component';
import { CardModule } from 'primeng/card';
import { LayoutRoutingModule } from '../layout/layout-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaylistsTrackSearchComponent } from './components/playlists-track-search/playlists-track-search.component';
import { PlaylistsTrackListComponent } from './components/playlists-track-list/playlists-track-list.component';
import { MessageModule } from 'primeng/message';

const playlistsComponents = [
  PlaylistsListComponent,
  PlaylistsCreateComponent,
  PlaylistsDetailComponent,
  PlaylistsTrackSearchComponent,
  PlaylistsTrackListComponent,
];

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
  ],
  exports: [...playlistsComponents],
  declarations: [...playlistsComponents],
  providers: [],
})
export class PlaylistsModule {}
