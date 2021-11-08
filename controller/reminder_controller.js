let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
        searchResult.title = req.body.title
        searchResult.description = req.body.description
        if (req.body.completed == 'true') {
            searchResult.completed = true
        } else {
            searchResult.completed = false
        }
        res.redirect("/reminders")
    } else {
        res.redirect("/reminders")
    }
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id
    let reminders = database.cindy.reminders
    // console.log(reminders);
    // console.log(reminders[0]);
    // console.log(reminders[0].id);
    for (let i =0; i<reminders.length;i++){
      // console.log("for loop running");
      if (reminders[i].id == reminderToFind){
        // console.log("if ran");
        database.cindy.reminders.splice(i,1);
        break;
      }
    }
    res.redirect("/reminders")
    
  },
};

module.exports = remindersController;
