import { ProductsService } from './../../../services/products.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Action } from '../../table/table.component';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  headers = [{
    headerName: 'Logo',
    key: 'logo',
    type: 'image'
  },{
    headerName: 'Nombre del producto',
    key: 'name',
    type: 'text'
  },{
    headerName: 'Descripción',
    key: 'description',
    type: 'text'
  },{
    headerName: 'Fecha de liberación',
    key: 'date_release',
    type: 'date'
  },{
    headerName: 'Fecha de reestructuración',
    key: 'date_revision',
    type: 'date'
  }];
  items = this._productsService.products$;
  itemsLoading = this._productsService.loading$;
  filtersKeys = ['id','name','description'];
  filter = '';
  actionLoading = false;

  constructor(
    private _productsService: ProductsService,
    private router: Router,
    private _confirmDialog: ConfirmDialogService,
    private _viewContainerRef: ViewContainerRef
  ){}

  ngOnInit(): void {
    this._productsService.getProducts()
  }

  handleAction(action : Action): void {
    switch(action.name) {
      case 'delete':
        const observableResult = this._confirmDialog.openConfirmDialog(
          this._viewContainerRef,
          `¿Estás seguro de eliminar el producto ${action.item.name} ?`
          ).subscribe((confirmed) => {
            if(confirmed){
              this.actionLoading = true;
              this._productsService.deleteProduct(action.item.id)
              .subscribe({
                next: () => {
                  this.actionLoading = false;
                },
                error: (error) => {
                  this.actionLoading = false;
                }
              })
            }
            observableResult.unsubscribe();
          })
        break;
      case 'edit':
        this.router.navigate(['/products/edit', action.item.id]);
        break;
    }
  }





}
