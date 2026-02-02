import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductCatalogService } from '../../../core/services/product-catalog.service';
import { Product } from '../../../core/models/products';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private catalogService = inject(ProductCatalogService);
  private cdr = inject(ChangeDetectorRef);

  product: Product | null = null;
  loading = true;
  error: string | null = null;
  errorType: 'not-found' | 'server' | 'network' | 'unknown' = 'unknown';
  private currentProductId: string | null = null;

  ngOnInit(): void {
    this.loadProduct();
  }

  private loadProduct(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        this.currentProductId = id;
        if (id) {
          return this.catalogService.getProductById(id);
        }
        return of(null);
      })
    ).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
        this.error = null;
        console.log('Product loaded:', product);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.product = null;
        console.error('Error loading product:', err);
        
        // Determinar tipo de error y mensaje apropiado
        if (err.status === 404) {
          this.errorType = 'not-found';
          this.error = 'El producto que buscas no existe o ha sido eliminado.';
        } else if (err.status === 0) {
          this.errorType = 'network';
          this.error = 'No se pudo conectar con el servidor. Por favor verifica tu conexión a internet.';
        } else if (err.status >= 500) {
          this.errorType = 'server';
          this.error = 'El servidor está experimentando problemas. Por favor intenta de nuevo más tarde.';
        } else {
          this.errorType = 'unknown';
          this.error = 'Hubo un problema al cargar el producto. Por favor intenta de nuevo.';
        }
        
        this.cdr.detectChanges();
      }
    });
  }

  retry(): void {
    this.loading = true;
    this.error = null;
    this.loadProduct();
  }
}
