import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  async checkEmail(email: string): Promise<boolean> {
    const CHECK_URL = 'http://localhost:8000/api/check/';
    if (email) {
      let response = await fetch(CHECK_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({email:email})
      });
      let responseAsJson = await response.json() as boolean;
      return responseAsJson
    }
    return false
  }
}
