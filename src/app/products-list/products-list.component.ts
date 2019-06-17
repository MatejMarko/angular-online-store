import { Component, OnInit } from '@angular/core';
import {Product} from '../shared/models/Product';
import {RestServiceService} from '../shared/services/rest-service.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  listOfProducts: Product[];

  constructor(private restService: RestServiceService) { }

  async ngOnInit() {
    this.listOfProducts = await this.getProducts('any');
    console.log(this.listOfProducts);
  }

  async getProducts(category: string): Promise<Product[]> {
    try {
      const resp = await this.getProductsByCategory(category);
      return resp;
    } catch (e) {
      return null;
    }
  }

  private async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      return await this.restService.authHttpRequest('products', {
        key: category
      });
    } catch (e) {
      return null;
    }
  }

}
