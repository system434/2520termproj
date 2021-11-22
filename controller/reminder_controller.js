const userController = require ("./userController");
const { userModel } = require("../models/userModel");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: userController.getUserById(req.user.id).reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = userController.getUserById(req.user.id).reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: userController.getUserById(req.user.id).reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: userModel.findById(req.user.id).reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    userController.getUserById(req.user.id).reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = userController.getUserById(req.user.id).reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
	let reminderToFind = req.params.id
	let searchResult = userController.getUserById(req.user.id).reminders.find(reminders => reminders.id == reminderToFind )
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
    // Implement this code
	let reminderToFind = req.params.id
	let searchResult = userController.getUserById(req.user.id).reminders.find(reminders => reminders.id == reminderToFind )
	if (searchResult != undefined) {
		let Array_Postion = userController.getUserById(req.user.id).reminders.indexOf(searchResult)
		userController.getUserById(req.user.id).reminders.splice(Array_Postion, 1)
		res.redirect("/reminders")
	} else {
		res.redirect("/reminders")
	}
  },
};

module.exports = remindersController;
