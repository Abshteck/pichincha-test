import { DateFormatDirective } from './date-format.directive';

describe('DateFormatDirective', () => {
  it('should create an instance', () => {

    const input = document.createElement('input');

    const elementRefMock = {
      nativeElement: input
    }

    const directive = new DateFormatDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });
});
