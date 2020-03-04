$(document).ready(async () => {
  $('#add').click(addHandler);
  $('#remove').click(removeHandler);

  populateLast();
});

const addHandler = async () => {
  try {
    $('#status').html('last operation: add');
  }
  catch (e) {
    populateErrorStatus();
  }
};

const removeHandler = async () => {
  try {
    $('#status').html('last operation: remove');
  }
  catch (e) {
    populateErrorStatus();
  }
};

const getLast = async n => {
  return $.get(`last/${n}`);
};

const populateLast = async () => {
  const data = await getLast(10);

  let tableData = $('#last tbody');
  tableData.empty();

  // later, try using a template system to generate the table rows
  data.forEach(row => {
    const { key, url, created, updated } = renderLinkData(row);
    tableData.append(`<tr><td>${key}</td><td>${url}</td><td>${updated}</td><td>${created}</td></tr>`);
  });
};

const populateErrorStatus = () => {
  $('#status').html('last operation failed');
};

const renderLinkData = data => {
  let key = data.key;
  let url = data.url;
  let created = data.created;
  let updated = data.updated;

  return {
    key: key,
    url: url,
    created: created,
    updated: updated
  }
};
