import { Injectable } from '@angular/core';
import {Image} from '../models/Image';
import {Product} from '../models/Product';
import {RestService} from './rest-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  selectedCategoryId = -1;
  selectedProductId = -1;
  listOfProducts: Product[] = [];
  showSelectedProduct = false;
  selectedProduct: Product = null;

  constructor(private restService: RestService) { }

  async getProductsFromCategoryTab() {
    if (this.selectedCategoryId === 0) {
      this.listOfProducts = await this.getProducts();
    } else {
      this.listOfProducts = await this.getProductsByCategory(this.selectedCategoryId);
    }
  }

  async setSelectedProduct() {
    for (const product of this.listOfProducts) {
      if (product.id === this.selectedProductId) {
        this.selectedProduct = product;
        this.showSelectedProduct = true;
      }
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const products = await this.getAllProducts();
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

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      const products = await this.getProductsByCategoryCall(categoryId);
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

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.restService.authHttpRequest('products');
    } catch (e) {
      return null;
    }
  }

  async getProductsByCategoryCall(category: number): Promise<Product[]> {
    try {
      return await this.restService.authHttpRequest('products/byCategory', {
        category: category
      });
    } catch (e) {
      return null;
    }
  }

  async getFirstImages(): Promise<Image[]> {
    try {
      return await this.restService.authHttpRequest('products/image');
    } catch (e) {
      return null;
    }
  }

}
