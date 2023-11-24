import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { dateEqualOrGreaterThan,convertStringToDate } from 'src/app/validators/date-equal-or-greater-than';
import { productExistsValidator } from 'src/app/validators/products/already-exist';



@Component({
  selector: 'app-products-editor',
  templateUrl: './products-editor.component.html',
  styleUrls: ['./products-editor.component.css']
})
export class ProductsEditorComponent implements OnInit {

  productForm  = this.formBuilder.group({
    id : ['', {
      validators: [Validators.required,Validators.minLength(3), Validators.maxLength(10)],
      asyncValidators: [productExistsValidator(this._productsService)],
      updateOn: 'change'
    }],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo : ['', Validators.required],
    date_release: ['', [
      Validators.required,
      dateEqualOrGreaterThan(
        new Date()
      )
    ]],
    date_revision: ['']
  });

  sending = false;
  isEditing = false;

  constructor(
    private formBuilder: FormBuilder,
    private _productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productForm.get('date_revision')?.disable();

    this.route.paramMap.subscribe((params: ParamMap) => {
      const productId = params.get('id');
      if (productId) {
        const product = this._productsService.getProduct(productId)

        // if there is not a product with that id redirect to products list
        if (!product) {
          this.router.navigate(['/products']);
        }else{
          this.isEditing = true;
          this.productForm.patchValue({
            ...product,
            date_release: this.dateToString(new Date(product.date_release)),
            date_revision: this.dateToString(new Date(product.date_revision))
          });
          this.productForm.get('id')?.disable();
        }
      }
    });
  }

  submitForm(): void {
    if (this.productForm.valid) {
      this.sending = true;
      let functionToExecute = null;
      if (this.isEditing) {
        functionToExecute = this._productsService.editProduct;
      }else{
        functionToExecute = this._productsService.createProduct;
      }

      functionToExecute.bind(this._productsService)({
        ...this.productForm.value,
        id : this.productForm.get('id')?.value,
        date_revision: this.productForm.get('date_revision')?.value
      })
      .subscribe({
        next: () => {
          this.sending = false;
          this.router.navigate(['/products']);
          this.resetForm();
        },
        error: () => {
          this.sending = false;
        }
      });

    }
  }

  resetForm(){
    if (this.isEditing) {
      // reset all form except id
      this.productForm.reset({
        id: this.productForm.get('id')?.value
      });
    }else{
      this.productForm.reset();
    }
  }

  dateReleaseChange() {
    // get date value
    const value = this.productForm.get('date_release')?.value;
    const date = convertStringToDate(value!);
    if (date) {
      // add one year
      date.setFullYear(date.getFullYear() + 1);
      // set date revision value
      this.productForm.get('date_revision')?.setValue(this.dateToString(date));
    }
  }

  private dateToString(date : Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

}
