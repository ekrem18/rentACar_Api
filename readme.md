# Rent_A_Car _Api

### Author:
Linkedin: [@ekremyilmazturk](https://www.linkedin.com/in/ekrem-yilmazturk/)
<br>
<br>

<h3>About My Project</h3>
<p> 📌As you can see from the ER diagram, this API service project is built upon four different models. 📌Token used for security.  📌A permission system is established for editing/changing something about res./cars. 📌If you are a customer/user, you can select start and end date and see the list of available cars on selected dates. You can choose a car on the list and reserve that car, but can not reserve more than one car on a selected time period. You can not reserve cars which are reserved by other customers on selected time period. You can see the list of their reservations including past ones. You can list, create, read their reservations. 📌If you are an admin;  you can make CRUD operations on Car table, Customer (User) table and Reservation table📌Logging is implemented. 📌If you want to read the API documentation and check the structure, Swagger and Redoc documents are also available. To access them, you can follow the '/redoc' or '/swagger' routes.  </p>
<br>

<h3>How to install</h3>
If you want to clone the project to your local and test it, you must install first ,  
📌"npm i express dotenv mongoose express-async-errors", 📌"npm i morgan", 📌"npm i multer", 📌"node i nodemailer"
Finally, in the project directory, you can run:  `nodemon index.js`
<br>
<br>

<h3>What is in this api project?</h3>
<ul style="font-size: 18px;">
  <li>Logging</li>
  <li>Permissions</li>
  <li>Authentications MW</li>
  <li>Error Handler MW</li>
  <li>Finding, Sorting and Pagination MW</li>
  <li>Swagger & Redoc Docs</li>
</ul>
<br>
<br>


### Folder/File Structure:

```
    .env
    .gitignore
    index.js
    readme.md
    src/
        config/
            dbConnection.js
            swagger.json
        controllers/
            auth.js
            car.js
            reservation.js
            token.js
            user.js
        helpers/
            passwordEncrypt.js
            sync.js
        middlewares/
            authentication.js
            errorHandler.js
            findSearchSortPage.js
            logger.js
            permissions.js
        models/
            car.js
            reservation.js
            token.js
            user.js
        routes/
            auth.js
            car.js
            document.js
            index.js
            reservation.js
            token.js
            user.js
```