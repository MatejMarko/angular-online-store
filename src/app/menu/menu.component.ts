import { Component, OnInit } from '@angular/core';
import {Category} from '../shared/models/Category';
import {Product} from '../shared/models/Product';
import {RestServiceService} from '../shared/services/rest-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  listOfCategories: Category[] = [];

  constructor(private restService: RestServiceService) { }

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

}
