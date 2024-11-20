import { login, register } from "../controllers/authController";
import { Request, Response } from "express";
import User from "../models/user";
import { describe, test, expect, it } from "@jest/globals";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

jest.mock('../models/user');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');
const MockUser = User as jest.MockedClass<typeof User>;
const MockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
const MockJwt = jwt as jest.Mocked<typeof jwt>

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
    const saveMock = jest.fn().mockResolvedValueOnce({
      _id: 'mockedUserId',
      email: 'test@example.com',
      role: 'adopter',
    });

    MockUser.mockImplementation(() => {
      return {
        save: saveMock,
        _id: 'mockedUserId',
        email: 'test@example.com',
        role: 'adopter',
      } as any;
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
      } as any;
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
      } as any;
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
    process.env.JWT_SECRET = 'mockedSecret';
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    res = {
      status: mockStatus,
      json: mockJson,
      jsonp: mockJson,
    } as unknown as Response;
  

      (MockJwt.sign as jest.Mock).mockImplementation(() => 'mockedToken');
      (MockBcrypt.compare as jest.Mock).mockResolvedValue(true);
      (MockUser.findOne as jest.Mock).mockResolvedValue({
        _id: 'mockedUserId',
        email: 'test@example.com',
        password: 'hashedPassword123',
        role: 'adopter',
    });
  });

  it("Should log in user with correct credentials", async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    } as unknown as Request;

    await login(req as Request, res as Response);

    expect(MockUser.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(MockBcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword123");
    expect(mockStatus).toHaveBeenCalledWith(200)
    expect(mockJson).toHaveBeenCalledWith({
      token: 'mockedToken',
      role: "adopter"
    });
  });

  it("Should return 401 when user is not found", async () => {
    (MockUser.findOne as jest.Mock).mockResolvedValue(null);
    const req = {
      body: {
        email: 'nonexistent@example.com',
        password: 'password123',
      }
    } as unknown as Request;
    await login(req as Request, res as Response);

    expect(mockStatus).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });

  it("Should return 401 when password does not match", async () => {
    (MockUser.findOne as jest.Mock).mockResolvedValue(null);
    const req = {
      body: {
        email: 'test@example.com',
        password: 'wrongpassword123',
      }
    } as unknown as Request;
    await login(req as Request, res as Response);

    expect(mockStatus).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });

  it('Should generate a JWT for valid credentials', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    } as unknown as Request;
    await login(req as Request, res as Response);
    expect(MockJwt.sign).toBeCalledWith(
        { id: 'mockedUserId', role: 'adopter' },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
    )
  });

  it('should return 400 for missing email or password', async () => {
    const req = {
        body: {},
    } as unknown as Request;

    await login(req as Request, res as Response);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({ error: 'Email and password are required' });
  });

  it('should return 500 for unexpected server errors', async () => {
    const error = new Error('Unexpected error');
    (MockUser.findOne as jest.Mock).mockRejectedValueOnce(error); // Simulate DB failure

    const req = {
        body: {
            email: 'test@example.com',
            password: 'password123',
        },
    } as unknown as Request;

    await login(req as Request, res as Response);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ error: 'Server error' });
  });

});

