import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AudioPlayerComponent } from './audio-player.component';

@NgModule({
  imports: [CommonModule],
  exports: [AudioPlayerComponent],
  declarations: [AudioPlayerComponent],
  providers: [],
})
export class AudioPlayerModule {}
