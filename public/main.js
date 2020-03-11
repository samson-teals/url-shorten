$(document).ready(async () => {
  $('#add').click(addHandler);
  $('#remove').click(removeHandler);

  populateLast();
});

const addHandler = async () => {
  try {
    const url = $('#url').val();
    const data = await $.ajax({
      type: 'POST',
      url: 'add',
      data: JSON.stringify({
        url: url
      }),
      contentType: 'application/json'
    });

    $('#status').html(JSON.stringify(data));
  }
  catch (e) {
    populateErrorStatus();
  }
};

const removeHandler = async () => {
  try {
    const key = $('#key').val();
    const data = await $.ajax({
      type: 'POST',
      url: 'remove',
      data: JSON.stringify({
        key: key
      }),
      contentType: 'application/json'
    });

    $('#status').html(JSON.stringify(data));
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
