# hahow project
## Getting started
### Initialize the project
```
npm install
```
### Start the API server
```
npm start
```
You will see `Server running at https://localhost:8000/` if the API server starts successfully.
### Run unit tests
```
npm test
```

## Call APIs by curl
*Since the certificate is Self-Signed SSL Certificate created by OpenSSL, we should add `-k` to avoid `curl: (60) SSL certificate problem: self signed certificate`*
### List Heroes [GET] /heroes
#### Request
```
curl -k -H "Accept: application/json" -H "Content-Type: application/json" -H -X GET https://localhost:8000/heroes
```
#### Response 200
```
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
#### Request
```
curl -k -H "Accept: application/json" -H "Content-Type: application/json" -H -X GET https://localhost:8000/heroes/1
```
#### Response 200
```
{
  "id": "1",
  "name": "Daredevil",
  "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg"
}
```
### Authenticated List Heroes [GET] /heroes
#### Request
```
curl -k -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -H "Password: rockssss" -X GET https://localhost:8000/heroes
```
#### Response 200
```
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
#### Request
```
curl -k -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -H "Password: rockssss" -X GET https://localhost:8000/heroes/1
```
#### Response 200
```
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
2 main API interfaces `/heroes` and `/heroes/:heroId` are built, and each interface handles 2 type of API calling methods: `simple request` and `advanced request with authentication handler`.
### Test
**Jest + SuperTest**  
2 separated files in `tests` directory: one is for `list heroes`, and the other one is fot `single hero`. Each of the 2 files handles both `simple request` and `advanced request with authentication handler`.
