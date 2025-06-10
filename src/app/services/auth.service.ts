import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private URL_API_BACKEND: string = 'http://localhost:8000/api/';
  public currentEmail:string = ''

  async checkEmail(email: string): Promise<boolean> {
    const CHECK_URL = `${this.URL_API_BACKEND}check/`;
    try {
      let response = await fetch(CHECK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message);
        
        throw new Error(errorData.message || `HTTP-Fehler! Status: ${response.status}`);
      }
      let responseAsJson = (await response.json()) as boolean;
      this.currentEmail = email
      return responseAsJson;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('Ein unbekannter Fehler ist aufgetreten.');
      }
    }
  }
}