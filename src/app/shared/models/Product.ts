export class Product {
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: string;

  constructor(name: string, price: number, description: string, quantity: number, category: string) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.quantity = quantity;
    this.category = category;
  }
}
