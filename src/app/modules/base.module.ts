import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout/layout-routing.module';
import { LayoutModule } from './layout/layout.module';
import { LoginModule } from './login/login.module';
import { PagesModule } from './pages/pages.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    HttpClientModule,
    PagesModule,
    LoginModule,
    PlaylistsModule,
    LayoutModule,
    LayoutRoutingModule,
    SharedModule,
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class BaseModule {}
