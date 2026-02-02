import { Routes } from '@angular/router';
import { ProductListComponent } from './features/catalog/product-list/product-list.component';
import { ProductDetailComponent } from './features/catalog/product-detail/product-detail.component';

export const routes: Routes = [
    {
        path: 'products',
        component: ProductListComponent,
    },
    {
        path: 'products/:id/:slug',
        component: ProductDetailComponent,
    },
    {
        path: 'products/:id',
        component: ProductDetailComponent,
    },
];
