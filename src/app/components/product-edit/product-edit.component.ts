import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
  productId: number;
  productFormGroup?: FormGroup;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.productId = +activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe( product => {
      this.productFormGroup = this.fb.group({
        name: [product.name, Validators.required],
        image: [product.image, Validators.required],
        price: [product.price, Validators.required],
        quantity: [product.quantity, Validators.required],
      })
    });
  }

  onSubmit(): void {
    const updatedProduct = {id: this.productId, ...this.productFormGroup?.value};
    this.productService.updateProduct(updatedProduct).subscribe(
      data => {
        alert("Product updated successefully !");
        this.router.navigate(['/']);
      }
    )
  }

}
