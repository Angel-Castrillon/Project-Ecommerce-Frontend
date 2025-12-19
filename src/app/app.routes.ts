import { Routes } from '@angular/router';
import { ProductListComponent } from './features/catalog/product-list/product-list.component';

export const routes: Routes = [
    {
        path: 'products',
        component: ProductListComponent,
    },
];
