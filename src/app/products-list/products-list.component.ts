import { Component, OnInit } from '@angular/core';
import {Product} from '../shared/models/Product';
import {ProductsService} from '../shared/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  preferredWidth = 200;
  preferredHeight = 280;

  constructor(public productsService: ProductsService) { }

  async ngOnInit() {
    if (this.productsService.selectedCategoryId === -1) {
      this.productsService.listOfProducts = await this.productsService.getProducts();
    } else {
      this.productsService.listOfProducts = await this.productsService.getProductsByCategory(this.productsService.selectedCategoryId);
    }
  }

  goToProduct(id) {
    console.log('go to project id: ' + id);
  }

}
