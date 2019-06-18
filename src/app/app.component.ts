import { Component } from '@angular/core';
import {ProductsService} from './shared/services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public productsService: ProductsService) {

  }
}
