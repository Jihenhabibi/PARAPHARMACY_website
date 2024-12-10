import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  product?: Product;
  productFormGroup?: FormGroup;
  productId: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.productId = +route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe((product) => {
      this.product = product;
      this.productFormGroup = this.fb.group({
        name: [product.name, Validators.required],
        price: [product.price, Validators.required],
        quantity: [product.quantity, Validators.required],
        quantityToBuy: [1, [Validators.required, Validators.min(1), Validators.max(product.quantity)]]
      });
    });
  }

  submitPurchase(): void {
    const quantityToBuy = this.productFormGroup?.get('quantityToBuy')?.value;
    if (quantityToBuy > (this.product?.quantity || 0)) {
      alert('Insufficient stock !');
      return;
    }

    const updatedProduct: Product = {
      ...this.product!,
      quantity: (this.product?.quantity || 0) - quantityToBuy
    }

    this.productService.updateProduct(updatedProduct).subscribe(() => {
      alert('Product added to cart !');
      this.router.navigate(['/']);
    })
  }

}
