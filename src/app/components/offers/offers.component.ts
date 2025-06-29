import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { CommonModule } from '@angular/common';
import { Content } from '../../content';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OffersComponent {
  currentContent: Content[] = [];
  latestContent: Content[] = [];
  groupedByCategory: Record<string, Content[]> = {};
  chosenContent?:Content

  constructor(private contetService: ContentService,
     private router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    register()
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

  choseContent(uuid:string){
    console.log(uuid);
    this.chosenContent = this.currentContent.find(item => item.uuid === uuid);
    console.log(this.chosenContent);

  }

  openPlayer(id:number | undefined){
    if(id){
      this.contetService.chosenVideoId = id
      this.router.navigate(['/player'])
    }
  }

}
