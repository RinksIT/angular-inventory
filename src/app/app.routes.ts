import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  {
    path: 'products',
    loadComponent: () =>
      import('./components/product-list/product-list.component').then(
        (m) => m.ProductListComponent,
      ),
    data: { renderMode: 'client' }, // ✅ safe
  },

  {
    path: 'products/add',
    loadComponent: () =>
      import('./components/product-form/product-form.component').then(
        (m) => m.ProductFormComponent,
      ),
    data: { renderMode: 'client' }, // ✅ recommended
  },

  {
    path: 'products/edit/:id',
    loadComponent: () =>
      import('./components/product-form/product-form.component').then(
        (m) => m.ProductFormComponent,
      ),
    data: { renderMode: 'client' }, // ✅ REQUIRED (fixes error)
  },
];
