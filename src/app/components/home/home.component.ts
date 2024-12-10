import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = []; // Liste des produits
  selectedProduct: Product | null = null; // Produit sélectionné pour la modal

  constructor(private productService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts(); // Charger les produits au démarrage
  }

  // Charger tous les produits
  loadProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products.filter(p => p.quantity > 0); // Filtrer les produits avec quantité disponible
    });
  }

  // Ouvrir la modal pour afficher les détails du produit
  openModal(product: Product): void {
    this.selectedProduct = product;
    ($('#productModal') as any).modal('show');
  }

  // Fermer la modal
  closeModal(): void {
    ($('#productModal') as any).modal('hide');
  }

  // Supprimer un produit
  deleteProduct(product: Product): void {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");
    if (confirmDelete) {
      this.productService.deleteProduct(product).subscribe(() => {
        ($('#productModal') as any).modal('hide');
        this.loadProducts(); // Recharger les produits après suppression
      });
    }
  }

  // Modifier un produit
  editProduct(product: Product): void {
    this.router.navigateByUrl("/edit-product/" + product.id);
  }
}
