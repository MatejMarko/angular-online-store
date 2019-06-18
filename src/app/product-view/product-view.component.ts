import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../shared/services/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  constructor(public productsService: ProductsService) { }

  ngOnInit() {
  }

}
