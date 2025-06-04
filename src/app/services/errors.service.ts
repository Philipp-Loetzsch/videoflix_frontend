import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  constructor() {}

  async emailError(emailErrors: ValidationErrors): Promise<string> {
    if (emailErrors['required']) return 'Please enter an Email';
    else if (emailErrors['email'] || emailErrors['pattern']) {
      return 'Please enter a valid Email. E.g. your-mail@example.com';
    }
    return '';
  }

  async pwError(pwErrors: ValidationErrors): Promise<string> {
    if (pwErrors['required']) return 'please enter a password';
    else if (pwErrors['minlength']) return 'minimum lenght 6';
    return ''
  }
}
