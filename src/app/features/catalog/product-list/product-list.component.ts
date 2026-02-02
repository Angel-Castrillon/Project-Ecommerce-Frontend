import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductCatalogService, CatalogFilters } from '../../../core/services/product-catalog.service';
import { CursorPage } from '../../../core/models/cursor-page';
import { Product } from '../../../core/models/products';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  private catalog = inject(ProductCatalogService);
  private cdr = inject(ChangeDetectorRef);
  page: CursorPage<Product> | null = null;
  loading = false;
  error: string | null = null;
  errorType: 'network' | 'server' | 'unknown' = 'unknown';

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
      error: (err) => {
        this.handleError(err, 'No se pudo cargar el catálogo.');
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
      error: (err) => {
        this.handleError(err, 'No se pudo cargar la siguiente página.');
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
      error: (err) => {
        this.handleError(err, 'No se pudo cargar la página anterior.');
      },
    });
  }

  onSearch(): void {
    this.filters.per_page = 5;
    
    // Si hay un término de búsqueda, limpiar otros filtros para hacer una búsqueda global
    if (this.filters.search) {
      this.filters.search = this.filters.search.trim();
      this.filters.category_id = undefined;
      this.filters.min_price = undefined;
      this.filters.max_price = undefined;
      this.filters.in_stock = undefined;
      this.filters.is_active = undefined;
    }
    
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

  retry(): void {
    this.load();
  }

  private handleError(err: any, defaultMessage: string): void {
    this.loading = false;
    console.error('Error in product list:', err);

    if (err.status === 0) {
      this.errorType = 'network';
      this.error = 'No se pudo conectar con el servidor. Por favor verifica tu conexión a internet.';
    } else if (err.status >= 500) {
      this.errorType = 'server';
      this.error = 'El servidor está experimentando problemas. Por favor intenta de nuevo más tarde.';
    } else {
      this.errorType = 'unknown';
      this.error = defaultMessage;
    }

    this.cdr.detectChanges();
  }
}
