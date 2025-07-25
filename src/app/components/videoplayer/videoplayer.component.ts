import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Content } from '../../content';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'videojs-http-source-selector';

type VideoJsPlayerWithPlugin = Player & {
  httpSourceSelector?: (options?: { default?: string | undefined }) => void;
};
@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss',
})
export class VideoplayerComponent implements OnDestroy {
  currentContent?: Content | null;
 player!: VideoJsPlayerWithPlugin;

  @ViewChild('target', { static: true }) target!: ElementRef;

  constructor(private contentService: ContentService) {}

  async ngOnInit(): Promise<void> {
    this.currentContent = await this.contentService.getSingleContent();
    if (!this.currentContent?.hls_playlist) return;

    this.player = videojs(this.target.nativeElement, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      fluid: false,
      sources: [
        {
          src: this.currentContent.hls_playlist,
          type: 'application/x-mpegURL',
        },
      ],
    });
    this.player.httpSourceSelector?.();
    this.player.on('ready', () => {
      this.player.httpSourceSelector?.({ default: 'auto' });
    });

  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}
