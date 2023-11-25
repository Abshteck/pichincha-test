import { FormControl } from '@angular/forms';
import { dateEqualOrGreaterThan } from './date-equal-or-greater-than';

describe('DateEqualOrGreaterThanValidator', () => {
  it('should validate if date is equal or greater than the reference date', () => {
    const referenceDate = new Date('2000-05-10');
    const validator = dateEqualOrGreaterThan(referenceDate);

    const control = new FormControl('15/05/2000');
    expect(validator(control)).toBeNull();

    const control2 = new FormControl('05/05/2000');
    expect(validator(control2)).toEqual({ dateEqualOrGreaterThan: true });
  });

  it('should handle empty or invalid date strings', () => {
    const referenceDate = new Date('2023-01-01');
    const validator = dateEqualOrGreaterThan(referenceDate);

    const control = new FormControl(null);
    expect(validator(control)).toBeNull();

    const control2 = new FormControl('not a date');
    expect(validator(control2)).toEqual(null);
  });

});
