exports.checkFieldsAndType = (body, refObj) => {
  if (!body || !refObj) return false;

  const requiredFields = Object.keys(refObj);

  for (let requiredField of requiredFields) {
    if (!body.hasOwnProperty(requiredField)) {
      return false;
    }
    if (refObj[requiredField] !== typeof body[requiredField]) {
      return false;
    }
  }
  return true;
};
