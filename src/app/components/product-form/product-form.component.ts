import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <h2>{{ isEdit ? 'Edit' : 'Add' }} Product</h2>
    <form (ngSubmit)="submit()">
      <label>Name:</label>
      <input [(ngModel)]="product.name" name="name" required />
      <label>Price:</label>
      <input type="number" [(ngModel)]="product.price" name="price" required />
      <button type="submit">{{ isEdit ? 'Update' : 'Add' }}</button>
    </form>
  `,
})
export class ProductFormComponent {
  productService = inject(ProductService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  product: Product = { id: 0, name: '', price: 0 };
  isEdit = false;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEdit = true;
      const existing = this.productService.getProductById(id);
      if (existing) this.product = { ...existing };
    }
  }

  submit() {
    if (this.isEdit) {
      this.productService.updateProduct(this.product);
    } else {
      this.productService.addProduct(this.product);
    }
    this.router.navigate(['products']);
  }
}
