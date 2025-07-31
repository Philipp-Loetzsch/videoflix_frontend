// import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
// import { ContentService } from '../../services/content.service';
// import { Content } from '../../content';
// import videojs from 'video.js';
// import type Player from 'video.js/dist/types/player';
// import 'videojs-http-source-selector';
// import 'videojs-hls-quality-selector';

// type VideoJsPlayerWithPlugin = Player & {
//   httpSourceSelector?: (options?: { default?: string | undefined }) => void;
// };
// @Component({
//   selector: 'app-videoplayer',
//   standalone: true,
//   imports: [],
//   templateUrl: './videoplayer.component.html',
//   styleUrl: './videoplayer.component.scss',
// })
// export class VideoplayerComponent implements OnDestroy {
//   currentContent?: Content | null;
//  player!: VideoJsPlayerWithPlugin;

//   @ViewChild('target', { static: true }) target!: ElementRef;

//   constructor(private contentService: ContentService) {}

//   async ngOnInit(): Promise<void> {
//     this.currentContent = await this.contentService.getSingleContent();
//     if (!this.currentContent?.hls_playlist) return;

//     this.player = videojs(this.target.nativeElement, {
//       controls: true,
//       autoplay: false,
//       preload: 'auto',
//       fluid: false,
//       sources: [
//         {
//           src: this.currentContent.hls_playlist,
//           type: 'application/x-mpegURL',
//         },
//       ],
//     });
//     this.player.httpSourceSelector?.();
//     this.player.on('ready', () => {
//       this.player.httpSourceSelector?.({ default: 'auto' });
//     });
    

//   }

//   ngOnDestroy(): void {
//     if (this.player) {
//       this.player.dispose();
//     }
//   }
// }
// import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
// import { ContentService } from '../../services/content.service';
// import { Content } from '../../content';

// declare const shaka: any;

// @Component({
//   selector: 'app-videoplayer',
//   standalone: true,
//   imports: [],
//   templateUrl: './videoplayer.component.html',
//   styleUrls: ['./videoplayer.component.scss'], // Korrektur hier
// })
// export class VideoplayerComponent implements AfterViewInit, OnDestroy {
//   @ViewChild('target', { static: true }) target!: ElementRef<HTMLVideoElement>;
//   currentContent?: Content | null;
//   player!: shaka.Player;
//   ui?: shaka.ui.Overlay;

//   constructor(private contentService: ContentService) {}

//  async ngAfterViewInit(): Promise<void> {
//   this.currentContent = await this.contentService.getSingleContent();
  
//   if (!this.target?.nativeElement) {
//     console.error('Video-Element nicht gefunden');
//     return;
//   }
//   if (!this.currentContent?.hls_playlist) {
//     console.error('Kein HLS-Playlist-URL vorhanden');
//     return;
//   }
  
//   const video = this.target.nativeElement;
//   const parent = video.parentElement;
//   if (!parent) {
//     console.error('Video-Element hat kein Parent-Element');
//     return;
//   }

//   this.player = new shaka.Player(video);
//   this.ui = new shaka.ui.Overlay(this.player, parent, video);
//     this.ui?.configure({
//       controlPanelElements: ['play_pause', 'time_and_duration', 'mute', 'volume', 'quality', 'fullscreen'],
//     });

//     // Fehler-Handling
//     this.player.addEventListener('error', (e: any) => {
//       console.error('Shaka Fehler:', e.detail?.message || e.message);
//     });

//     // Stream laden
//     try {
//       await this.player.load(this.currentContent.hls_playlist);
//     } catch (error) {
//       console.error('Fehler beim Laden des Videos:', error);
//     }
//   }

//   ngOnDestroy(): void {
//     if (this.player) {
//       this.player.destroy();
//     }
//   }
// }

import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Content } from '../../content';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'videojs-http-source-selector';
import 'videojs-hls-quality-selector';

type VideoJsPlayerWithPlugin = Player & {
  hlsQualitySelector?: (options?: { displayCurrentQuality?: boolean }) => void;
};

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss',
})
export class VideoplayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('target', { static: true }) target!: ElementRef<HTMLVideoElement>;
  currentContent?: Content | null;
  player!: VideoJsPlayerWithPlugin;

  constructor(private contentService: ContentService) {}

  async ngAfterViewInit(): Promise<void> {
    this.currentContent = await this.contentService.getSingleContent();
    if (!this.currentContent?.hls_playlist) return;

    this.player = videojs(this.target.nativeElement, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      fluid: true,
      sources: [{
        src: this.currentContent.hls_playlist,
        type: 'application/x-mpegURL',
      }],
    }) as VideoJsPlayerWithPlugin;
    // await import('videojs-hls-quality-selector');

    this.player.ready(() => {
      this.player.hlsQualitySelector?.({
        displayCurrentQuality: true,
      });
    });
  }

  ngOnDestroy(): void {
    this.player?.dispose();
  }
}
