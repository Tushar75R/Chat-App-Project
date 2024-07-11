const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal server error";
  const status = err.cause?.status || 500;
  return res.status(status).json({
    success: false,
    message: err.message,
  });
};

const TryCatch = (passedFunc) => async (req, res, next) => {
  try {
    await passedFunc(req, res, next);
  } catch (error) {
    next(error);
  }
};

export { errorMiddleware, TryCatch };
