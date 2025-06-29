import { Content } from './../content';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor() { }

  private URL_CONTENT = 'http://localhost:8000/api/content/'
  public chosenVideoId: number = 0

 async getContent(): Promise<Content[]>{
    const response = await fetch(this.URL_CONTENT,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }

    )
    let currentContent = await response.json()
    console.log(currentContent);
    return currentContent
  }

  async getSingleContent(): Promise<Content>{
    const response = await fetch(this.URL_CONTENT + this.chosenVideoId,{
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
    let currentSingleContent = await response.json()
    return currentSingleContent
  }
}
