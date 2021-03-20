const jwtAuthz = require("express-jwt-authz");

exports.checkPermissions = (permissions) => {
  console.log('checking permissions', permissions);
  return jwtAuthz([permissions], {
    customScopeKey: "permissions",
    checkAllScopes: true,
    failWithError: true
  });
};