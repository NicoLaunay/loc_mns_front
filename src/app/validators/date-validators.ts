import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateOrderValidator(group: AbstractControl): ValidationErrors | null {
  const start = group.get('startDate')?.value;
  const end = group.get('endDate')?.value;
  if (start && end && new Date(end) <= new Date(start)) {
    return { dateOrder: true };   // erreur si fin <= début
  }
  return null;
}

export function startIsFutureValidator(group: AbstractControl): ValidationErrors | null {
    const today = new Date()
    today.setHours(0,0,0,0)
    const start = group.get('startDate')?.value
    if (start && new Date(start) < today) {
        return { startIsPast: true }
    }
    return null
}