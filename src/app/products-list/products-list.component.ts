import { Component, OnInit } from '@angular/core';
import {Product} from '../shared/models/Product';
import {RestServiceService} from '../shared/services/rest-service.service';
import {Image} from '../shared/models/Image';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  listOfProducts: Product[];
  preferredWidth = 200;
  preferredHeight = 280;

  constructor(private restService: RestServiceService) { }

  async ngOnInit() {
    this.listOfProducts = await this.getProducts('any');
  }

  async getProducts(category: string): Promise<Product[]> {
    try {
      const products = await this.getProductsByCategory(category);
      const images = await this.getFirstImages();
      for (const product of products) {
        for (const image of images) {
          if (image.id_product === product.id) {
            product.image = image.link;
          }
        }
      }
      return products;
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

  private async getFirstImages(): Promise<Image[]> {
    try {
      return await this.restService.authHttpRequest('products/image');
    } catch (e) {
      return null;
    }
  }

  goToProduct(id) {
    console.log('go to project id: ' + id);
  }

}
