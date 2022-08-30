import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import { verifyAuthToken } from '../service/verifyAuthToken';

const store = new OrderStore();

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders/:id', verifyAuthToken, show);
};

export default orderRoutes;
