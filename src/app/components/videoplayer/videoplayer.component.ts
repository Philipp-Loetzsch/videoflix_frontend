import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Content } from '../../content';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'videojs-http-source-selector';
import 'videojs-hls-quality-selector';
import { CommonModule, Location } from '@angular/common';

type VideoJsPlayerWithPlugin = Player & {
  hlsQualitySelector?: (options?: { displayCurrentQuality?: boolean }) => void;
};

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss',
})
export class VideoplayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('target', { static: true }) target!: ElementRef<HTMLVideoElement>;
  currentContent?: Content | null;
  player!: VideoJsPlayerWithPlugin;
  timeout: any;

  constructor(private contentService: ContentService, private location: Location) { }

  ngOnInit() {


    this.startHideTimer();
    document.addEventListener('mousemove', () => this.resetHeaderTimer());
  }

  async ngAfterViewInit(): Promise<void> {
    this.currentContent = await this.contentService.getSingleContent();
    if (!this.currentContent?.hls_playlist) return;

    this.player = videojs(this.target.nativeElement, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      fluid: false,
      responsive: false,
      fill: false,
      sources: [{
        src: this.currentContent.hls_playlist,
        type: 'application/x-mpegURL',
      }],
    }) as VideoJsPlayerWithPlugin;

    this.player.ready(() => {
      this.player.hlsQualitySelector?.({
        displayCurrentQuality: true,
      });
    });
  }

  ngOnDestroy(): void {
    this.player?.dispose();
  }
  back() {
    this.location.back();
  }

  resetHeaderTimer() {
    this.showHeader();
    clearTimeout(this.timeout);
    this.startHideTimer();
  }

  startHideTimer() {
    this.timeout = setTimeout(() => this.hideHeader(), 2000);
  }

  hideHeader() {
    const header = document.getElementById('header');
    if (header) header.style.opacity = '0';
  }

  showHeader() {
    const header = document.getElementById('header');
    if (header) header.style.opacity = '1';
  }
}
