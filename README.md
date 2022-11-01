# Tweet for reading

```
npm install
npm run initdb
npm start
```
env: has mongo command line utils installed, uses mongoimport
local env: http://localhost:3000

```
all id below is referring to field _id

Check login status
-----------
API: /api/getCurrUser
Method: POST
Body:
{
    "isLoggedIn": booleam,
    "user": {
        "user": "admin123"
    }
}

User login
-----------
API: /api/authenticate
Method: POST
Body:
{
  username: "admin123",
  password: "1234567"
}

Create a student
-----------
API: /api/student
Method: POST
Body:
const student = {
      name: "Dylan",
      NUID: 2345678,
      twitterAccount: "@dylan123"
    }

Get all students
---------
API: /api/students
Method: GET

Get one students
---------
API: /api/students/:id
Method: GET
Param:
field id

Search student name
---------
API: /api/search
Method: GET
Query:
name=String

Update one student
---------
API: /api/students/:id
Method: PUT
Param:
const student = {
      name: "Dylan",
      NUID: 2345678
    }

Delete one student
---------
API: /api/students/:id
Method: DELETE
Param: field id

```

