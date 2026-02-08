import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html', // ✅ external template
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private router = inject(Router);

  products = this.productService.getProducts(); // Signal<Product[]>

  // trackBy function for *ngFor
  trackById(_index: number, product: Product) {
    return product.id;
  }

  goAdd() {
    this.router.navigate(['products/add']);
  }

  goEdit(id: number) {
    this.router.navigate(['products/edit', id]);
  }

  delete(id: number) {
    this.productService.deleteProduct(id);
  }
}
