import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AudioPlayerModule } from '../audio-player/audio-player.module';
import { HeaderComponent } from './components/header/header.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [CommonModule, LayoutRoutingModule, AudioPlayerModule],
  exports: [],
  declarations: [LayoutComponent, HeaderComponent],
  providers: [],
})
export class LayoutModule {}
