import { Routes } from '@angular/router';
import { ProductListComponent } from './features/catalog/product-list/product-list.component';
import { ProductDetailComponent } from './features/catalog/product-detail/product-detail.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'products', pathMatch: 'full' },
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
        ]
    },

    {
        path: 'login',
        component: LoginComponent,
        canActivate: [publicGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [publicGuard]
    },
    { path: '**', redirectTo: '' }
];
