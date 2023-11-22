import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsEditorComponent } from './products-editor/products-editor.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from '../table/table.component';

const routes : Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'create', component: ProductsEditorComponent },
  { path: 'edit', component: ProductsEditorComponent }
];

@NgModule({
  declarations: [
    ProductsEditorComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableComponent
  ]
})
export class ProductsModule { }
