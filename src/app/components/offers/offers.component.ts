import { Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { CommonModule } from '@angular/common';
import { Content } from '../../content';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OffersComponent {
  currentContent: Content[] = [];
  latestContent: Content[] = [];
  groupedByCategory: Record<string, Content[]> = {};
  chosenContent?: Content;
  success: string = ""
  slides: number = 5
  isActive:boolean = false
  constructor(private contetService: ContentService, private router: Router, private authService: AuthService) { }

  @ViewChild('videoPlayer') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('preview') preview!: ElementRef<HTMLElement>;


  async ngOnInit(): Promise<void> {
    this.checkWidth();
    window.addEventListener('resize', this.checkWidth.bind(this));
    register();
    const data = await this.contetService.getContent();
    this.currentContent = data;

    const sorted = [...data].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    this.latestContent = sorted.slice(0, 10);

    this.groupedByCategory = data.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {} as Record<string, Content[]>);
    this.chosenContent = this.latestContent[0];

  }

  choseContent(uuid: string) {
    this.chosenContent = this.currentContent.find((item) => item.uuid === uuid);
    this.isActive = !this.isActive;

  }

  openPlayer(id: number | undefined) {
    if (id) {
      this.contetService.chosenVideoId = id;
      localStorage.setItem('videoId', `${id}`)
      this.router.navigate(['/player']);
    }
  }

  setVolume() {
    if (this.videoRef?.nativeElement) {
      this.videoRef.nativeElement.volume = 0.2;
    }
  }
  async logOut() {
    const result = await this.authService.logOut()
    if (result) {
      this.success = result
      setTimeout(() => {
        this.router.navigate(['/log_in'])
      }, 1000);
    }

  }
  checkWidth() {
    this.slides = window.innerWidth < 786 ? 2 : 5;
  }

}
