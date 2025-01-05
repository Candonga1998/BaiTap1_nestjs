import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService, Product } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(): Product[] {
    return this.productsService.getAll();
  }

  @Post()
  create(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ): Product {
    return this.productsService.create(name, price, description);
  }

  @Get(':id')
  getById(@Param('id') id: number): Product {
    return this.productsService.getById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ): Product {
    return this.productsService.update(+id, name, price, description);
  }

  @Delete(':id')
  delete(@Param('id') id: number): void {
    this.productsService.delete(+id);
  }
}
