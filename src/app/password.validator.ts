import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidator {
    static mustBeValid(control: AbstractControl): ValidationErrors | null {
      const value = control.value as string;

      if (value.length < 8) { return {invalidLength: true}; }

      if (!(/[a-z]/.test(value))) { return {noLowerCase: true}; }

      if (!(/[A-Z]/.test(value))) { return {noUpperCase: true}; }

      if (!(/[0-9]/.test(value))) { return {noNumber: true}; }

      if (!(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value))) { return {noSymbol: true}; }

      return null;
    }
}
