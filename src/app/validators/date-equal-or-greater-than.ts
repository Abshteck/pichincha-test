import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateEqualOrGreaterThan(referenceDate: Date): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // if value is empty or contain a not numeric character (excluding /)
    if (!control.value || control.value.match(/[^\d\/]/)) {
      return null;
    }

    const enteredDate = convertStringToDate(control.value);

    if (!enteredDate) {
      return { dateEqualOrGreaterThan: {
        valid: false,
      } };
    }

    if (compareDates(enteredDate,referenceDate)) {
      return null;
    } else {
      return { dateEqualOrGreaterThan: true };
    }
  };
}

export function convertStringToDate(dateString : string | null) {

  if (!dateString || dateString.length < 10) {
    return null;
  }

  // use only the 10 first characters
  const value = dateString.slice(0, 10)
  const [day, month, year] = value.split('/').map(Number);
  return new Date(year, month - 1, day);
}

// compare dates considering only year, month and day
function compareDates(dateA : Date, dateB : Date) {
  dateA.setHours(0, 0, 0, 0);
  dateB.setHours(0, 0, 0, 0);
  return dateA.getTime() >= dateB.getTime();
}
