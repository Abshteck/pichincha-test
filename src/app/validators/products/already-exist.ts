import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";
import { ProductsService } from "src/app/services/products.service";

export function productExistsValidator(_productService: ProductsService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value;

    // Realizar la solicitud a la API para verificar si el valor existe
    return _productService.productExists(value).pipe(
      map((response) => {
        return response ? { productExistsValidator: true } : null;
      })
    );
  };
}
