const SuccessHandler = (res, result) => {
  return res.status(200).json({
    success: true,
    data: result,
    error: null,
  });
};
const ErrorHandler = (res, error) => {
  return res.status(400).json({
    success: false,
    data: null,
    error,
  });
};

const ResponseHandler = ({ validator, controller, props }) => {
  return (req, res) => {
    try {
      const propValues = props ? props(req) : [];
      validator(...propValues);
      const result = controller(...propValues);
      return SuccessHandler(res, result);
    } catch (error) {
      return ErrorHandler(res, error.message);
    }
  };
};

export default ResponseHandler;
