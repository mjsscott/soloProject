import { login, register } from "../controllers/authController";
import { Request, Response } from "express";
import User from "../models/user";
import { describe, test, expect, it } from "@jest/globals";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../models/user');
const MockUser = User as unknown as jest.Mock;

describe('Auth Controller - Register', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
        role: 'adopter',
      },
    };
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    res = {
      status: mockStatus,
      json: mockJson,
      jsonp: mockJson,
    };
    jest.clearAllMocks();
  });

  it('should register user on success', async () => {
    const saveMock = jest.fn().mockResolvedValueOnce(null);
    MockUser.mockImplementation(() => {
      return {
        save: saveMock,
        _id: 'mockedUserId',
        email: 'test@example.com',
        role: 'adopter',
      };
    });
    await register(req as Request, res as Response);

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(201);
    expect(mockJson).toBeCalledWith({
      message: 'User registered successfully',
      user: {
      id: 'mockedUserId',
      email: 'test@example.com',
      role: 'adopter',
      },
    });
  });

  it('should handle a database save error', async () => {
    const saveMock = jest.fn().mockRejectedValueOnce(new Error('Database save failed'));
    MockUser.mockImplementation(() => {
      return {
        save: saveMock,
      }
    });
    await register(req as Request, res as Response);

    expect(saveMock).toBeCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toBeCalledWith({
      error: 'Database save failed',
    });
  });

  it('should handle missing fields in request body', async () => {
    req.body = {};
    await register(req as Request, res as Response);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toBeCalledWith({
      error: 'email, password and role are expected fields'
    });
  });

  it('should handle unexpected errors', async () => {
    const saveMock = jest.fn().mockImplementationOnce(() => {
      throw new Error('Unexpected server error');
    })
    MockUser.mockImplementation(() => {
      return { 
        save: saveMock,
      };
    });
    await register(req as Request, res as Response);
    
    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toBeCalledWith({
      error: 'Unexpected server error',
    })
  })

});

describe('Auth Controller - Login', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
        role: 'adopter',
      },
    };
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    res = {
      status: mockStatus,
      json: mockJson,
      jsonp: mockJson,
    };
    jest.clearAllMocks();
  });
})

