import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { CursorPage } from '../models/cursor-page';
import { Product } from '../models/products';

export type CatalogSortBy = 'id' | 'created_at' | 'price' | 'name';
export type CatalogSortDir = 'asc' | 'desc';

export interface CatalogFilters {
  search?: string;
  category_id?: number;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
  is_active?: boolean;

  sort_by?: CatalogSortBy;
  sort_dir?: CatalogSortDir;

  per_page?: number;
  cursor?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductCatalogService {
  private readonly baseUrl = `${environment.apiUrl}/products/catalog`;

  constructor(private http: HttpClient) {}

  getCatalog(filters: CatalogFilters = {}): Observable<CursorPage<Product>> {
    let params = new HttpParams();
    if (filters.cursor) {
      params = params.set('cursor', filters.cursor);
    }
    return this.http.post<CursorPage<Product>>(this.baseUrl, filters, { params });
  }

  nextPage(current: CursorPage<Product>, filters: CatalogFilters = {}) {
    if (!current.next_cursor) {
      return this.getCatalog(filters);
    }

    return this.getCatalog({
      ...filters,
      cursor: current.next_cursor,
    });
  }

  prevPage(current: CursorPage<Product>, filters: CatalogFilters = {}) {
    if (!current.prev_cursor) {
      return this.getCatalog(filters);
    }

    return this.getCatalog({
      ...filters,
      cursor: current.prev_cursor,
    });
  }

  getProductById(id: string | number): Observable<Product> {
    const url = `${environment.apiUrl}/products/${id}`;
    return this.http.get<{ success: boolean; data: Product }>(url).pipe(
      retry({
        count: 2,
        delay: 1000,
        resetOnSuccess: true
      }),
      map(response => response.data),
      catchError((error: any) => {
        console.error('Error fetching product:', error);
        throw error;
      })
    );
  }
}