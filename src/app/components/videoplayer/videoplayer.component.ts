// import { Component, ViewChild, ElementRef } from '@angular/core';
// import { ContentService } from '../../services/content.service';
// import { Content } from '../../content';
// import Hls from 'hls.js';

// @Component({
//   selector: 'app-videoplayer',
//   standalone: true,
//   imports: [],
//   templateUrl: './videoplayer.component.html',
//   styleUrl: './videoplayer.component.scss',
// })
// export class VideoplayerComponent {
//   currentContent?: Content;

//   @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;

//   constructor(private contentService: ContentService) {}

//   async ngOnInit(): Promise<void> {
//     this.currentContent = await this.contentService.getSingleContent();
//     console.log(this.currentContent);
//     this.initPlayer();
//   }

//   initPlayer() {
//   setTimeout(() => {
//     const video = this.videoRef?.nativeElement;
//     const src = this.currentContent?.hls_playlist;
//     if (!video || !src) return;

//     if (Hls.isSupported()) {
//       const hls = new Hls();
//       hls.loadSource(src);
//       hls.attachMedia(video);
//     } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//       video.src = src;
//     }
//   });
// }

// }
import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Content } from '../../content';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'videojs-http-source-selector'; // Plugin für Quality Dropdown

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
