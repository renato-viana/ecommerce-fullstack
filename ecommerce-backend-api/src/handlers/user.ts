import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { TokenResponse } from '../models/interfaces/tokenResponse';
import { User, UserStore } from '../models/user';
import { verifyAuthToken } from '../service/verifyAuthToken';

const store = new UserStore();
dotenv.config();

interface JwtPayload {
  user: {
    id: number
    name: string,
    email: string
    password_digest: string
  }
}

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  try {
    const newUser = await store.create(user);
    res.json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400);
      res.json(error.message);
    }
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const user: User = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    const u = await store.authenticate(user);

    const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
    const tokenResponse: TokenResponse = {
      token
    };

    res.json(tokenResponse);
  } catch (error) {
    const notFound = 'User not found!';
    let status = 400;

    if (error.message === notFound) {
      status = 404;
    }

    res.status(status).json({ error: error.message });
  }
};

const update = async (req: Request, res: Response) => {
  const user: User = {
    id: parseInt(req.params.id),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayload;

    if (decoded.user.id !== user.id) {
      throw new Error('User id does not match!');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400);
      res.json(error.message);
    }
    return;
  }

  try {
    const updated = await store.update(user);
    res.json(updated);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400);
      res.json(error.message);
    }
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', verifyAuthToken, create);
  app.post('/users/authenticate', authenticate);
  app.put('/users/:id', verifyAuthToken, update);
};

export default userRoutes;
