import express, { Request, Response } from 'express';

import { Product, ProductStore } from '../models/product';
import { verifyAuthToken } from '../service/verifyAuthToken';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (e) {
    console.log(e);
    res.json('Error');
  }
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price)
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.status(201).json(deleted);
  } catch (error) {
    const notFound = `Product with id ${req.params.id} not found!`;
    let status = 409;

    if (error.message === notFound) {
      status = 404;
    }

    res.status(status).json({ error: error.message });
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

export default productRoutes;
