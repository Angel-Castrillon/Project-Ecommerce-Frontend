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

  clearFilters(): void {
    this.filters = {
      per_page: 5,
      sort_by: 'id',
      sort_dir: 'asc',
    };
    this.load();
  }

  onSortChange(): void {
    this.load();
  }
}
