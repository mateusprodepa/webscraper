const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
   const { headers: { authorization } } = req;

   if(authorization && authorization.split(' ')[0] === 'Token' || 'Bearer') {
      return authorization.split(' ')[1];
   }

   return null;
}

const auth = {
   required: jwt({
      secret: 'Id0n\'t4ctv4llyC4re',
      userProperty: 'payload',
      getToken: getTokenFromHeaders
   }),
   optional: jwt({
      secret: 'Id0n\'t4ctv4llyC4re',
      userProperty: 'payload',
      // getToken: getTokenFromHeaders,
      credentialsRequired: false
   })
}

module.exports = auth;