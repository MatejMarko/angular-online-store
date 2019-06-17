export class Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
  image: string;
  images: string[];

  constructor(id: number, name: string, price: number, description: string, quantity: number, category: string, image: string, images: string[]) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.quantity = quantity;
    this.category = category;
    this.image = image;
    this.images = images;
  }
}
