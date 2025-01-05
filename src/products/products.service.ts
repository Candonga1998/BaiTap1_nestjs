import { Injectable, NotFoundException } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  createdAt: Date;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private currentId = 1;

  getAll(): Product[] {
    return this.products;
  }

  create(name: string, price: number, description: string): Product {
    const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    const newProduct: Product = {
      id: newId,
      name,
      price,
      description,
      createdAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getById(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  update(id: number, name: string, price: number, description: string): Product {
    const product = this.getById(id);
    product.name = name;
    product.price = price;
    product.description = description;
    return product;
  }

  delete(id: number): void {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products.splice(index, 1);
  
    // Đặt lại currentId nếu mảng trống
    if (this.products.length === 0) {
      this.currentId = 1;
    }
  }
  
}
