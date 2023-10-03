const handleSuccessResponse = (res, statusCode, message, data) => {
  if (data) {
    res.status(statusCode).json({
      success: true,
      message,
      UserData: data,
    });
  } else {
    res.status(statusCode).json({
      success: true,
      message,
    });
  }
};

module.exports = handleSuccessResponse;
