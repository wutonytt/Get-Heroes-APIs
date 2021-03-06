const http = require("http");
const fs = require('fs');
const axios = require('axios')
const express = require('express');

const app = express();
const connProduction = {
  hostname: '0.0.0.0',
  port: process.env.PORT
};
const connDev = {
  hostname: 'localhost',
  port: 8000
}
const defaultOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
};

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  http.createServer(app).listen(connProduction.port, () => {
    console.log(`Server running at https://${connProduction.hostname}:${connProduction.port}/`)
  });
} else if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  http.createServer(app).listen(connDev.port, () => {
    console.log(`Server running at http://${connDev.hostname}:${connDev.port}/`)
  });
}

async function getHeroes() {
  return axios.get(
    'https://hahow-recruit.herokuapp.com/heroes',
    defaultOptions
  )
}
async function getHeroById(heroId) {
  return axios.get(
    `https://hahow-recruit.herokuapp.com/heroes/${heroId}`,
    defaultOptions
  )
}
async function auth(data, options) {
  return axios.post(
    'https://hahow-recruit.herokuapp.com/auth',
    data,
    options
  )
}
async function getProfileById(heroId) {
  return axios.get(
    `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,
    defaultOptions
  )
}

app.get('/heroes', (req, res) => {
  if (req.headers.hasOwnProperty('name') && req.headers.hasOwnProperty('password')) {
    let authData = {
      'name': req.header('name'),
      'password': req.header('password'),
    };
    let authOptions = {
      headers: {
        'content-type': 'application/json',
      },
    };
    auth(authData, authOptions).then(async response => {
      if (response.status == 200) {
        let heroes = (await getHeroes()).data;
        let ids = heroes.map(element => {
          return element.id
        });
        let request = ids.map(id => {
          return getProfileById(id).then(profile => {
            heroes.find(hero => hero.id === id)['profile'] = profile.data;
            return heroes;
          })
        });
        Promise.all(request).then(() => {
          res.json(heroes);
        })
      }
    }).catch(
      error => {
        if (error.response.status == 401) {
          res.status(401).send('Error 401: Authentication Error');
        } else if (error.response.status == 400) {
          res.status(400).send('Error 400: Bad Request')
        }
      }
    );
  } else {
    getHeroes().then(response => res.json(response.data));
  }
})

app.get('/heroes/:heroId', async (req, res) => {
  if (req.headers.hasOwnProperty('name') && req.headers.hasOwnProperty('password')) {
    let authData = {
      'name': req.header('name'),
      'password': req.header('password'),
    };
    let authOptions = {
      headers: {
        'content-type': 'application/json',
      },
    };
    auth(authData, authOptions).then(async response => {
      if (response.status == 200) {
        let hero = (await getHeroById(req.params.heroId)).data;
        let id = hero.id;
        await getProfileById(id).then(profile => {
          hero['profile'] = profile.data;
          return hero;
        })
        res.json(hero);
      }
    }).catch(
      error => {
        if (error.response.status == 401) {
          res.status(401).send('Error 401: Authentication Error');
        } else if (error.response.status == 400) {
          res.status(400).send('Error 400: Bad Request')
        }
      }
    );
  } else {
    getHeroById(req.params.heroId).then(response => res.json(response.data));
  }
})

module.exports = app