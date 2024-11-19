import { login, register } from "../controllers/authController";
import User from "../models/user";
import httpMocks from 'node-mocks-http';
import mockingoose from 'mockingoose';
import { describe, test, expect } from "@jest/globals";

jest.mock('../models/user');

describe('Auth Controller - Register', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('should save user and return success response', async () =>  {

    const mockUser = {
      _id: '12345',
      email: 'test@example.com',
      role: 'adopter',
      save: jest.fn().mockResolvedValue({
        _id: '12345',
      email: 'test@example.com',
      role: 'adopter'
      })
    };

    jest.spyOn(User.prototype, 'save').mockResolvedValue(mockUser);

    const req = httpMocks.createRequest({
      method: 'POST',
      body: { email: 'test@example.com', password: 'password123', role: 'adopter'}
    });
    const res = httpMocks.createResponse();
    await register(req,res);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual({
      message: 'User registered successfully',
      user: { id: '12345', email: 'test@example.com', role: 'adopter' },
    })
  });
});

