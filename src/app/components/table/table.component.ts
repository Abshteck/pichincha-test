import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface tableHeader {
  name: string;
  key: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class TableComponent {
  @Input() headers: tableHeader[] = [];
  @Input() items: any[] | null = [];
  @Input() emptyMessage: string = 'Aun no hay elementos';
  @Input() loading: boolean | null = false;
}
