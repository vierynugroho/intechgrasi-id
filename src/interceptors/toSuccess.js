const SuccessResponse = (statusCode, message, data) => {
  return {
    meta: {
      statusCode,
      message,
    },
    data,
  };
};

export default SuccessResponse;
