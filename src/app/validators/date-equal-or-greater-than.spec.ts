import { dateEqualOrGreaterThan } from './date-equal-or-greater-than';

describe('DateEqualOrGreaterThanValidator', () => {

  it('should create', () => {
    const validator = dateEqualOrGreaterThan(new Date());
    expect(validator).toBeTruthy();
  });
});
