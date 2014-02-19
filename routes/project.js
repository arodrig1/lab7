var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;
  console.log(projectID);
  models.Project.findById(projectID).exec(afterQuery);

  function afterQuery(err, project) {
    if(err) console.log(err);
    res.json(project);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  var newProject = new models.Project({
    "title": form_data["project_title"],
    "date": form_data["date"],
    "summary": "<p>" + form_data["summary"] + "</p>",
    "image": form_data["image_url"]
  });

  newProject.save(afterSaving);

  function afterSaving(err) {
    if (err) {
      console.log(err);
      res.send(500);
    }
    res.send(200);
  }
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  models.Project.findById(projectID).remove().exec(afterRemoving);

  function afterRemoving(err) {
    if(err) {
      console.log(err);
      res.send(500);
    }
    res.send(200);
  }

  // YOU MUST send an OK response w/ res.send();
}