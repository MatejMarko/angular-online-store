import { Component, OnInit } from '@angular/core';
import {Category} from '../shared/models/Category';
import {RestService} from '../shared/services/rest-service.service';
import {ProductsService} from '../shared/services/products.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  listOfCategories: Category[] = [];

  constructor(private restService: RestService, private productsService: ProductsService) { }

  async ngOnInit() {
    this.listOfCategories.push(new Category(0, 'Everything'));
    const categoriesFromDatabase: Category[] = await this.getCategories();
    for (const category of categoriesFromDatabase) {
      this.listOfCategories.push(category);
    }
  }

  async getCategories() {
    try {
      const categories = await this.getCategoriesCall();
      return categories;
    } catch (e) {
      return null;
    }
  }

  private async getCategoriesCall(): Promise<Category[]> {
    try {
      return await this.restService.authHttpRequest('categories');
    } catch (e) {
      return null;
    }
  }

  private changeCategory(id) {
    this.productsService.selectedCategoryId = id;
    this.productsService.getProductsFromCategoryTab();
    this.productsService.showSelectedProduct = false;
  }

}
