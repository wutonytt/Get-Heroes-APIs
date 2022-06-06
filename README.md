# Hahow Project - API Server for Heroes
## Getting Started
### Initialize the project
``` shell
npm install
```
### Start the API server
``` shell
npm start
```
You will see `Server running at https://localhost:8000/` if the API server starts successfully.
### Run unit tests
``` shell
npm test
```

## Call APIs by curl
*Since the certificate is Self-Signed SSL Certificate created by OpenSSL, we should add `-k` to avoid `curl: (60) SSL certificate problem: self signed certificate`*
### List Heroes [GET] /heroes
#### Request
``` shell
curl -k -H "Accept: application/json" -H "Content-Type: application/json" -H -X GET https://localhost:8000/heroes
```
#### Response 200
``` js
{
  "heroes": [
    {
      "id": "1",
      "name": "Daredevil",
      "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg"
    },
    {
      "id": "2",
      "name": "Thor",
      "image": "http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg"
    },
    // ...
  ]
}
```
### Single Hero [GET] /heroes/:heroId
*Sometimes the response of the api `https://hahow-recruit.herokuapp.com/heroes/:heroId` will be `{"code": 1000, "message": "Backend error"}`*
#### Request
``` shell
curl -k -H "Accept: application/json" -H "Content-Type: application/json" -H -X GET https://localhost:8000/heroes/1
```
#### Response 200
``` js
{
  "id": "1",
  "name": "Daredevil",
  "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg"
}
```
### Authenticated List Heroes [GET] /heroes
#### Request
``` shell
curl -k -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -H "Password: rockssss" -X GET https://localhost:8000/heroes
```
#### Response 200
``` js
{
  "heroes": [
    {
      "id": "1",
      "name": "Daredevil",
      "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg",
      "profile": {
        "str": 2,
        "int": 7,
        "agi": 9,
        "luk": 7
      },
    },
    {
      "id": "2",
      "name": "Thor",
      "image": "http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg"
      "profile": {
        "str": 8,
        "int": 2,
        "agi": 5,
        "luk": 9
      },
    },
    // ...
  ]
}
```
### Authenticated Single Hero [GET] /heroes/:heroId
*Sometimes the response of the api `https://hahow-recruit.herokuapp.com/heroes/:heroId` will be `{"code": 1000, "message": "Backend error"}`*
#### Request
``` shell
curl -k -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -H "Password: rockssss" -X GET https://localhost:8000/heroes/1
```
#### Response 200
``` js
{
  "id": "1",
  "name": "Daredevil",
  "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg",
  "profile": {
    "str": 2,
    "int": 7,
    "agi": 9,
    "luk": 7
  }
}
```

## Project Structure
```
├── cert
│   ├── cert.pem
│   ├── cert.srl
│   ├── key.pem
│   ├── server-cert.pem
│   ├── server-csr.pem
│   └── server-key.pem
├── package-lock.json
├── package.json
├── server.js
└── tests
    ├── list_heroes.spec.js
    └── single_hero.spec.js
```

## Server Structure
### API Server
**Node.js + Express**  
2 main routes `/heroes` and `/heroes/:heroId` are built, and each route handles 2 type of API calling methods: `simple request` and `advanced request with authentication handler`.
### Test
**Jest + SuperTest**  
2 separated files in `tests` directory: one is for `list heroes`, and the other one is fot `single hero`. Each of the 2 files handles both `simple request` and `advanced request with authentication handler`.

## 3rd-Party Libraries
### Express
**Description in official document**  
> Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.  

**My understanding and functionalities**  
> Express allows us to build a web application and create APIs in an easier way and also own the advantages in robustness and speed.

### Axios
**Description in official document**  
> Axios is a simple promise based HTTP client for the browser and node.js. Axios provides a simple to use library in a small package with a very extensible interface.  

**My understanding and functionalities**  
> Axios allows us to send HTTP requests and get responses for node.js in the program, and it can carry headers, data, and other parameters in the requests.

## My Comment Guidelines
Normally, I add comments in the code when the logics or the algorithms are complicated and hard to be interpret by the code directly.
For example:

## Challenges and Solutions
### New Framework
This is my first time building an API server with JavaScript, Node.js and Express.js, and I found out that I have to learn from the official documents or tutorials shared online. After learning this whole thing and with some basic knowledge of JavaScript using in frontend development, I managed to learn how to use JavaScript as a backend language and how to manipulate with the data with this framework. However, there may be some coding convention issues due to the unfamiliarity (as a newbie) of the framework.
