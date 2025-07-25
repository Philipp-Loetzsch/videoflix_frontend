
import { Router } from '@angular/router';
import { Content } from './../content';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(
    private router: Router
  ) {}

  // private URL_CONTENT = 'http://localhost:8000/api/content/';
  // private URL_REFRESH = 'http://localhost:8000/api/token/refresh/';
  private URL_CONTENT = 'https://34.32.50.51:8000/api/content/';
  private URL_REFRESH = 'https://34.32.50.51:8000/api/token/refresh/';
  public chosenVideoId: number = 0;

  async getContent(): Promise<Content[]> {
    try {
      const refresh = await fetch(this.URL_REFRESH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!refresh.ok) this.router.navigate(['/log_in']);

      const response = await fetch(this.URL_CONTENT, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) throw new Error('failed to load content')

      return await response.json();
    } catch (error) {
      console.error('getContent failed:', error);
      return [];
    }
  }

  async getSingleContent(): Promise<Content | null> {
    try {
      const response = await fetch(this.URL_CONTENT + this.chosenVideoId, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Fetch failed');

      return await response.json();
    } catch (error) {
      console.error('getSingleContent failed:', error);
      return null;
    }
  }
}
