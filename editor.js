function editData (keyValuePairs, data) {
  for (var key in keyValuePairs) {
    data[key] = keyValuePairs[key];
  };
}

exports.editData = editData;