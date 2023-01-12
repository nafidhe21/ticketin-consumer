const {expressjwt: jwt} = require('express-jwt');

function authJwt() {
  const api = process.env.API_URL;

  return jwt({
    secret: process.env.SECRET,
    algorithms: ['HS256']
  }).unless({
    path: [
      {url: `${api}/users/`, methods: ['GET', 'OPTIONS']},
      {url: `${api}/users/login`, methods: ['POST', 'OPTIONS']},
      {url: `${api}/users/register`, methods: ['POST', 'OPTIONS']},
      {url: `${api}/concerts/public/all`, methods: ['GET']},
      {url: /\/tmp\/uploads(.*)/, methods: ['GET', 'OPTIONS']},
    ]
  })
};

module.exports = authJwt 

