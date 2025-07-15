import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private URL_API_BACKEND: string = 'http://localhost:8000/api/';
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

  async createUser(signInForm: FormGroup): Promise<boolean> {
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

  async activateAccount(token: string) {
    const ACTIVATE_URL = `${this.URL_API_BACKEND}activate/`;
    try {
      let response = await fetch(ACTIVATE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token }),
      });
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

  // async logIn(logInForm:FormGroup): Promise<boolean | Error> {
  //   const values = logInForm.value
  //   const LOGIN_URL = `${this.URL_API_BACKEND}login/`;
  //   try {
  //     let response = await fetch(LOGIN_URL, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         email: values.email,
  //         password: values.password,
  //        }),
  //        credentials: 'include'
  //     });
  //     console.log(await response.json());

  //     if (!response.ok) {
  //       let errormsg = await response.json()
  //       return errormsg
  //     }
  //     let responseAsJson = (await response.json()) as boolean;

  //     return responseAsJson;
  //   } catch (error) {
  //     return error as Error
  //   }
  // }

async logIn(logInForm: FormGroup): Promise<true |  string[] | Error> {
  const { email, password } = logInForm.value;
  const LOGIN_URL = `${this.URL_API_BACKEND}login/`;

  try {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); // nur einmal aufrufen

    if (response.ok) return true;

    return data.detail as string[]; // <-- JSON-Fehlermeldung vom Server
  } catch (err) {
    return err as Error; // Fetch-/Netzwerkfehler
  }
}


}
