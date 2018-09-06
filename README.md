# redis-basic-auth

### Steps to run the application
```
git clone https://github.com/96mickey/redis-basic-auth.git
```
then install all the dependencies
```
npm install
```
to start the server run the command
```
npm start
```
now you can register and login using postman

to register send request to **localhost:3000/register** with data **email, password**

to login send request to **localhost:3000/login** with data **email, password**

on sending the same request for login you will notice that the response will be changed as now the redis cache is sending the response.

don't forget to run the redis before testing this code
