import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() { }

  // private URL_API_BACKEND: string = 'http://localhost:8000/api/';
  // private URL_API_BACKEND: string = 'https://34.32.50.51:8000/api/';
  private URL_API_BACKEND: string = 'https://v-backend.webdevelopment-loetzsch.de/api/';

  public currentEmail: string = '';

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
        throw new Error(
          errorData.message || `HTTP-Fehler! Status: ${response.status}`
        );
      }
      let responseAsJson = (await response.json()) as boolean;
      this.currentEmail = email;
      return responseAsJson;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('Ein unbekannter Fehler ist aufgetreten.');
      }
    }
  }

  async createUser(signInForm: FormGroup): Promise<true | string[] | Error> {
    const REGISTARTION_URL = `${this.URL_API_BACKEND}register/`;
    const values = signInForm.value;
    try {
      let response = await fetch(REGISTARTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          repeated_password: values.confirmpassword,
        }),
      });
      const data = await response.json();
      if (response.ok) return true;
      console.log(data);

      return data as string[];
    } catch (err) {
      return err as Error;
    }
  }

  async activateAccount(uidb64: string, token: string) {
    const ACTIVATE_URL = `${this.URL_API_BACKEND}activate/${uidb64}/${token}/`;
    try {
      let response = await fetch(ACTIVATE_URL, { method: 'GET' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP-Fehler! Status: ${response.status}`
        );
      }
      let responseAsJson = (await response.json()) as boolean;
      return responseAsJson;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('Ein unbekannter Fehler ist aufgetreten.');
      }
    }
  }

  async logIn(logInForm: FormGroup): Promise<true | string[] | Error> {
    const { email, password } = logInForm.value;
    const LOGIN_URL = `${this.URL_API_BACKEND}login/`;

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) return true;
      return data.detail as string[];
    } catch (err) {
      return err as Error;
    }
  }
  async logOut(): Promise<string> {
    const LOGIN_URL = `${this.URL_API_BACKEND}logout/`;
    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json()         
      return data.detail as string
    } catch (err) {
      throw new Error('Unknown error')
    }
  }
  async forgotPassword(email: string) {
    const FORGOTURL = `${this.URL_API_BACKEND}password_reset/`;
    try {
      let response = await fetch(FORGOTURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP-Fehler! Status: ${response.status}`
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('Ein unbekannter Fehler ist aufgetreten.');
      }
    }
  }
  async resetPassword(resetForm: FormGroup, uidb64: string, token: string): Promise<string> {
    const RESETURL = `${this.URL_API_BACKEND}password_confirm/${uidb64}/${token}/`;
    const { password, confirmpassword } = resetForm.value;
    try {
      let response = await fetch(RESETURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          new_password: password,
          repeated_new_password: confirmpassword
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP-Fehler! Status: ${response.status}`
        );
      }
      const data = await response.json();
      console.log(data["detail"]);
      return data["detail"]

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('Ein unbekannter Fehler ist aufgetreten.');
      }
    }
  }
}
