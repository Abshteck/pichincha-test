import {  AsyncValidatorFn, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { productExistsValidator } from './already-exist';

describe('ProductExistsValidator', () => {

  let productsServiceMock = {
    productExists: jest.fn(),
  } as any;

  it('should validate product existence asynchronously', async () => {
    const validator : any = productExistsValidator(productsServiceMock);
    productsServiceMock.productExists.mockReturnValue(of(true));

    const control = new FormControl('existingProductId');
    const result = await validator(control).toPromise()

    expect(result.productExistsValidator).toBe(true)
    expect(productsServiceMock.productExists).toHaveBeenCalledWith('existingProductId');
  });

  it('should handle non-existing product', async () => {
    const validator : any = productExistsValidator(productsServiceMock);
    productsServiceMock.productExists.mockReturnValue(of(false));

    const control = new FormControl('nonExistingProductId');
    const result = await validator(control).toPromise()

    expect(result).toEqual(null);
    expect(productsServiceMock.productExists).toHaveBeenCalledWith('nonExistingProductId');
  });
});
