# CS5620-P2

```
npm install
npm start
```

```
all id below is referring to field _id
-----------
post: /api/student
data format example:
const student = {
      name: "Dylan",
      NUID: 2345678,
      twitterAccount: "@dylan123",
      tweets: [
        {
          content: "React fiber: In React V15, drop frame happens :( React V16 changed the stack reconciler to fiber reconciler, which is a singly-linked list with fiber nodes, to record prev and next steps. The traverse therefore can be stopped and restarted.",
          timeStamp: Date.now(),
          metDeadline: true
        }
      ]
    }
---------
get all: /api/students
get all: /api/students/:id
---------
update one student: /api/students/:id
update params example:
const student = {
      name: "Dylan",
      NUID: 2345678,
      twitterAccount: "@dylan123"
    }
---------
delete: /api/students/:id
no param

```

