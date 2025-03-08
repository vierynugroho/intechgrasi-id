const ErrorResponse = (statusCode, message, error) => {
  return {
    error: {
      statusCode,
      message: message || 'Error has occurred',
      details: error || error.stack || 'Something went wrong',
    },
  };
};

export default ErrorResponse;
