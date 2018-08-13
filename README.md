# App-Founder [Live](https://app-founder.herokuapp.com)

Server and client are hosted on heroku. After some time, the application is put to sleep by Heroku due to inactivity. I try to ping the client but it may happen that you will have to wait a moment to load. 

This project was created to learn developing SPA with MEAN software bundle. 
The main tech-stack:
* Angular5
* AngularMaterial+flexbox
* Node.js/Express
* MongoDB/MLab

App is not finished and has a lot bugs, layout is fully responsive only on the home page. 
Main concept assumed functionality like:
* Register/login user
* Creating teams and projects by user
* Invitation system where user can be in multiple teams
* Team leader can make offer to the project owner. Project owner chooses from offers.

Authorization is handled with JSON web tokens. App have one lazy loaded module which contains all functionalities intended for the user. On firt load app is loading only home page due to loading speed. Contact section on home page is handled with Nodemailer and Google Smtp. I use also Dotenv to handle with environment variables.

I  must admit that this app deviates from main angular guide.   
In plan:
*  Now, I have one folder for all services. I want to create core folder for shared services like auth or some global functions and put separetly rest of more specialized services to components folders.
* move most of component logic to services
* start to using typescript features(interfaces, classes)
* make full secured api. At this time every loged user can make any action. I want also valid all api data.
* and fix bugs of course ( ͡° ͜ʖ ͡°)

![Image1](https://preview.ibb.co/e4cEbU/screencapture_app_founder_herokuapp_app_projects_2018_08_13_01_01_27.png)
![Image2](https://preview.ibb.co/g1sVGU/screencapture_app_founder_herokuapp_app_project_profile_5b2a48c0b2c3a305980d8a1b_2018_08_13_01_29_45.png)
![Image3](https://preview.ibb.co/hXdvGU/2.png)
