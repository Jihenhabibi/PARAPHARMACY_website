import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  photoUrl: string = 'assets/user-photo1.png'; // URL de la photo utilisateur

  constructor(private productService: ProductsService, private router: Router) {}

  ngOnInit(): void {}

  onSearch(dataForm: any): void {
    const keyword = dataForm.keyword;
    if (keyword) {
      this.productService.searchProducts(keyword);
    }
  }

  navigateToAddProduct(): void {
    this.router.navigate(['/add-product']);
  }
}
