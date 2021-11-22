let Database = [  
    {
    id: 1,
    name: "Yuki",
    role: "user",
    email: "yuki@gmail.com",
    password: "pass",
    reminders: [{id: 1, title: "stuff", description: "description", completed: false}]
  },
  {
    id: 2,
    name: "Chad",
    role: "admin",
    email: "admin@gmail.com",
    password: "pass",
    reminders: [{id: 1, title: "stuff", description: "description", completed: false}]
  }
]

module.exports = Database;