const getCleanErrorLocation = (stack) => {
  if (!stack) return 'Unknown location';

  const lines = stack.split('\n');
  const relevantLines = [];

  for (let i = 1; i < lines.length && relevantLines.length < 1; i++) {
    if (lines[i] && !lines[i].includes('node_modules')) {
      const cleanLine = lines[i]
        .trim()
        .replace(/^at\s+/, 'at ')
        .replace(/\s+\(file:\/\/\/(.+):(\d+):(\d+)\)/, ' ($1:$2)');

      relevantLines.push(cleanLine);
    }
  }

  return relevantLines.length > 0
    ? relevantLines.join('\n')
    : 'Lokasi tidak diketahui';
};

const ErrorResponse = (statusCode, message, error) => {
  return {
    error: {
      statusCode,
      type: error?.name || 'Error',
      message: message
        ? error?.message
          ? `${message} - ${error.message}`
          : message
        : 'Error has occurred',
      details:
        getCleanErrorLocation(error?.stack) ||
        error?.message ||
        error ||
        'Something went wrong',
    },
  };
};

export default ErrorResponse;
