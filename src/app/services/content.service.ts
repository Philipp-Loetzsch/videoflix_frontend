
import { Router } from '@angular/router';
import { Content } from './../content';
import { Injectable, numberAttribute } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(
    private router: Router
  ) {

  }

  private readonly URL_CONTENT = `${environment.apiUrl}${environment.apiEndpoints.video}`;
  private readonly URL_REFRESH = `${environment.apiUrl}${environment.apiEndpoints.refresh}`;
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
    debugger
    const id = localStorage.getItem('videoId')
    if (id) this.chosenVideoId = +id
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
