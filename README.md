# Chat-Api


## Overview

A RESTful API with a mutli endpoint that retrieves data from the given MongoDB collection


## Table of contents
* [Installation](#installation)
* [API Document](#api-document)
* [Live Demo](#live-demo)


## Installation
Clone repository
```
$ git clone https://github.com/ozivarol/Chat-api
```
Install dependencies
```
npm install
```

## Running

```
$ node app.js

or

$ nodemon npm start
```
Your app should now be running on [localhost:4040](http://localhost:4040/).

## API Document
Available endpoints in application
- GET `/main`
  - Expected Parameters<br>
      \-
  - Response <br>
      Endpoint responds with json
      ```json
      {
        "message": "Hello, welcome to Pixa Chat-App"
      }
      ```

- POST `/user/register`
  - Expected Parameters<br>
      \-
  - Expected Request Body <br>
      - *first_name*,*last_name*,*password*,*email*,*username* properties should be in string format
      ```json
     {
       "first_name":
       "last_name":
       "email":
       "password":
       "username":
     }
      ```
        ```
- POST `/user/login`
  - Expected Parameters<br>
      \-
  - Expected Request Body <br>
      ```json
     {
        "email":
        "password":
     }
      ```
             ```
- POST `/user/reset-password`
  - Expected Parameters<br>
      \-
  - Expected Request Body <br>
      ```json
     {
        "email":
     }
      ```
      
- DELETE `/user/delete-profile/:id`
  - Expected Parameters<br>
      \-
  - Expected Request Body <br>
      ```json
     {
       
     }
  
- PATCH `/user/update-profile/:id`
  - Expected Parameters<br>
      \-
  - Expected Request Body <br>
      ```json
     {
       "first_name":
       "last_name":
       "email":
       "password":
       "username":
       "media":
     }
    
        
- POST `/user/profile/:id/add-media`
  - Expected Parameters<br>
      \-
  - Expected Request Body <br>
      ```form-data
     {
        keyword:media format:file
     }
      ```
      
 - POST `/user/profile/block-user/:id`
  - Expected Parameters<br>
      \-
  - Expected Request Body <br>
      ```form-data
     {
        "username":
     }
      ```
 - POST `/message/new-message`
  - Expected Parameters<br>
      \-
  - Expected Request Body <br>
      ```form-data
     {
        "message":  //it create empty array
     }
      ```
  - POST `/message/:id/add-message`
  - Expected Parameters<br>
      \-
  - Expected Request Body <br>
      ```form-data
     {
        "message":
     }
      ```     
  - GET `/message/:id/my-message`
  - Expected Parameters<br>
      \-
  - Expected Request Body <br>
      ```form-data
     {
        
     }
      ```     
  ## Live Demo
Application running in the cloud with Heroku. <br>
endpoint of the API is '/main' or other endpoint <br>
Click and play with it!
<a href="https://pixa-chat.herokuapp.com/main" target="blank"><img align="center" src="https://cdn.icon-icons.com/icons2/2699/PNG/512/heroku_logo_icon_169035.png" alt="oguzhnavarol" height="75" width="200" /></a>    
     
    
    
