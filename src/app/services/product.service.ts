import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = signal<Product[]>([
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Keyboard', price: 50 },
  ]);

  getProducts() {
    return this.products;
  }

  addProduct(product: Product) {
    this.products.update((list) => [...list, { ...product, id: Date.now() }]);
  }

  updateProduct(product: Product) {
    this.products.update((list) => list.map((p) => (p.id === product.id ? product : p)));
  }

  getProductById(id: number) {
    return this.products().find((p) => p.id === id);
  }

  deleteProduct(id: number) {
    this.products.update((list) => list.filter((p) => p.id !== id));
  }
}
