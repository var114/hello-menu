/* Functions that help inject inline editable data in admin mode */
/* Import these functions as locals into Jade */

// mixin spanEdible(dataName, db)
//   span(data-edible=edible?'{"dataName": "#{dataName}", "db": "#{db.dbName}"}':null)&attributes(attributes)=db[dataName]

function edible(dataName, db, editMode) {
  var e = [] //span needs to be a inline-block to avoid collapsing to zero height
  e.push('<span ');
  if (editMode) {
    e.push('data-edible=');
    var dataEdibleAttr = {};
    dataEdibleAttr.dataName = dataName;
    dataEdibleAttr.db = db.dbName;
  e.push("'");
    e.push(JSON.stringify(dataEdibleAttr));
  e.push("'");
  }
  e.push(">");
  e.push(db[dataName]);
  e.push("</span>");
  return e.join('');
};

exports.edible = function (dataName, db, editMode) {
  return edible(dataName, db, editMode);
};

// var db = {title: 'bierhaus', dbName: 'siteInfo'};
// s = edible("title", db, true);
// console.log(s);