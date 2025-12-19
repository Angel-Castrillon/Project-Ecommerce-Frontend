import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductCatalogService, CatalogFilters } from '../../../core/services/product-catalog.service';
import { CursorPage } from '../../../core/models/cursor-page';
import { Product } from '../../../core/models/products';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  private catalog = inject(ProductCatalogService);
  private cdr = inject(ChangeDetectorRef);
  page: CursorPage<Product> | null = null;
  loading = false;
  error: string | null = null;

  filters: CatalogFilters = {
    per_page: 5,
    sort_by: 'id',
    sort_dir: 'asc',
  };

  sampleProducts = [
    { id: 1, name: 'Espinaca', price: '$12.000', image: 'https://via.placeholder.com/200x200/90EE90/000000?text=Espinaca' },
    { id: 2, name: 'Carrusel Musical', price: '$45.000', image: 'https://via.placeholder.com/200x200/FFB6C1/000000?text=Carrusel' },
    { id: 3, name: 'Libro 1984', price: '$28.000', image: 'https://via.placeholder.com/200x200/87CEEB/000000?text=1984' },
    { id: 4, name: 'Set de Maquillaje', price: '$65.000', image: 'https://via.placeholder.com/200x200/FFD700/000000?text=Makeup' },
    { id: 5, name: 'Control Remoto', price: '$35.000', image: 'https://via.placeholder.com/200x200/DDA0DD/000000?text=Control' },
    { id: 6, name: 'Cortador de Vegetales', price: '$22.000', image: 'https://via.placeholder.com/200x200/98FB98/000000?text=Cortador' },
    { id: 7, name: 'Bolso Organizador', price: '$48.000', image: 'https://via.placeholder.com/200x200/778899/000000?text=Bolso' },
    { id: 8, name: 'Bolso Organizador Azul', price: '$52.000', image: 'https://via.placeholder.com/200x200/4682B4/000000?text=Bolso' },
    { id: 9, name: 'Juguete Pop It', price: '$18.000', image: 'https://via.placeholder.com/200x200/DA70D6/000000?text=PopIt' },
  ];


  constructor() {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;

    this.catalog.getCatalog(this.filters).subscribe({
      next: (res) => {
        this.page = res; 
        this.loading = false;
        this.cdr.detectChanges(); 
      },
      error: () => {
        this.error = 'No se pudo cargar el catálogo.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  next(): void {
    if (!this.page) return;

    this.loading = true;
    this.catalog.nextPage(this.page, this.filters).subscribe({
      next: (res) => {
        this.page = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar la siguiente página.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  prev(): void {
    if (!this.page) return;

    this.loading = true;
    this.catalog.prevPage(this.page, this.filters).subscribe({
      next: (res) => {
        this.page = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar la página anterior.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  onSearch(): void {
    this.filters.per_page = 5; 
    this.load();
  }
}
