import { Prisma } from '@prisma/client';
import jwt from 'jsonwebtoken';
import ErrorResponse from '../interceptors/toError.js';
import { ErrorHandler } from '../filters/error.js';

const logError = (err) => {
  console.log('\x1b[31m%s\x1b[0m', '=============== ERROR ==============');
  console.log(new Date().toISOString());
  console.log('\x1b[31m%s\x1b[0m', '====================================');
  console.log('\x1b[33m%s\x1b[0m', 'Name:', err.name || 'Unknown Error');
  console.log('\x1b[33m%s\x1b[0m', 'Message:', err.message);
  console.log('\x1b[33m%s\x1b[0m', 'Details:', err.stack || err);
  console.log('\x1b[31m%s\x1b[0m', '====================================');
};

const handlePrismaError = (err, res) => {
  const errorMap = {
    P2002: { status: 409, message: 'Duplicate field, constraint violation' },
    P2003: { status: 409, message: 'Key Constraint' },
    P2005: { status: 409, message: 'Resource not found' },
    default: { status: 500, message: 'Database error' },
  };

  const { status, message } = errorMap[err.code] || errorMap.default;
  const response = ErrorResponse(status, message, err);
  return res.status(status).json(response);
};

const handleJWTError = (err, res) => {
  let message = 'Authentication error';

  if (err instanceof jwt.JsonWebTokenError) {
    message = `${err.message}, please re-login`;
  } else if (err instanceof jwt.NotBeforeError) {
    message = 'Token is not active, please re-login';
  } else if (err instanceof jwt.TokenExpiredError) {
    message = 'Token is expired, please re-login';
  }

  const response = ErrorResponse(401, message, err);
  return res.status(401).json(response);
};

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  logError(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(err, res);
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return handlePrismaError(err, res);
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    return handlePrismaError(err, res);
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    return handlePrismaError(err, res);
  }

  if (
    err instanceof jwt.JsonWebTokenError ||
    err instanceof jwt.NotBeforeError ||
    err instanceof jwt.TokenExpiredError
  ) {
    return handleJWTError(err, res);
  }

  if (err instanceof ErrorHandler) {
    const response = ErrorResponse(err.statusCode, 'something went wrong', err);
    return res.status(err.statusCode).json(response);
  }

  if (err instanceof TypeError) {
    const response = ErrorResponse(err.statusCode, 'type error', err);
    return res.status(err.statusCode).json(response);
  }

  const response = ErrorResponse(500, 'something went wrong', err);
  return res.status(500).json(response);
};

export default errorMiddleware;
