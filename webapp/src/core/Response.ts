export enum ResponseType {
  JSON = 'json',
  REDIRECT = 'redirect',
}

const SuccessHandler = (res, type, result) => {
  if (type === ResponseType.REDIRECT) {
    return res.redirect(result);
  } else if (type === ResponseType.JSON) {
    return res.status(200).json({
      success: true,
      data: result,
      error: null,
    });
  }
};
const ErrorHandler = (res, error) => {
  return res.status(400).json({
    success: false,
    data: null,
    error,
  });
};

const ResponseHandler = ({
  validator,
  controller,
  props,
  type = ResponseType.JSON,
}) => {
  return async (req, res) => {
    try {
      const propValues = props ? props(req) : [];
      validator(...propValues);
      const result = await controller(...propValues);
      return SuccessHandler(res, type, result);
    } catch (error) {
      return ErrorHandler(res, error.message);
    }
  };
};

export default ResponseHandler;
