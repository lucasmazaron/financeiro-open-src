import { AbstractControl, ValidationErrors } from '@angular/forms';

export const hasNumber = (control: AbstractControl): ValidationErrors | null => {
  const regex = /\d/;
  if (!regex.test(control.value)) {
      return { numberRequired: true };
  }
  return null;
};

export const hasSpecialCharacter = (control: AbstractControl): ValidationErrors | null => {
  const regex = /[!@#$%^&*(),.?":{}|<>]/;
  if (!regex.test(control.value)) {
      return { specialCharRequired: true };
  }
  return null;
};

export const hasUpperCase = (control: AbstractControl): ValidationErrors | null => {
  const regex = /[A-Z]/;
  if (!regex.test(control.value)) {
      return { uppercaseRequired: true };
  }
  return null;
};
