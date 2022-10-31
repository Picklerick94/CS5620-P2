# CS5620-P2

```
npm install
npm start
```

```
all id below is referring to field _id

Check login status
-----------
API: /api/getCurrUser
Method: POST
Params:
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
Params:
{
  username: "admin123",
  password: "1234567"
}

Create a student
-----------
API: /api/student
Method: POST
Params:
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

Update one student
---------
API: /api/students/:id
Method: PUT
Params:
const student = {
      name: "Dylan",
      NUID: 2345678
    }

Delete one student
---------
API: /api/students/:id
Method: DELETE
no param

```

