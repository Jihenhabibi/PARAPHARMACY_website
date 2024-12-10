import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {

  constructor(private productService: ProductsService, private router: Router) {}

  onSubmit(p: any): void {
    this.productService.save(p).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

}
