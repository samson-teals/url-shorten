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

    $('#url').val('');
    populateAddStatus(data);
    populateLast();
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

    $('#url').val(data.url);
    $('#key').val('');
    populateRemoveStatus(data);
    populateLast();
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

const populateAddStatus = data => {
  let status = $('#status');

  const { key, url, created, updated } = renderLinkData(data);
  const statusStr = `Add ok:<ul><li>key: ${key}</li><li>url: ${url}</li><li>updated: ${updated}</li><li>created: ${created}</li></ul>`;

  status.html(statusStr);
};

const populateRemoveStatus = data => {
  $('#status').html(`removed key ${data.key}`);
};

const renderLinkData = data => {
  let key = data.key;
  let url = data.url;
  let created = data.created;
  let updated = data.updated;

  key = `<a href="r/${key}">${key}</a>`;
  url = `<a href="${url}">${url}</a>`;
  created = moment.utc(created).local().format('lll');
  updated = moment.utc(updated).local().format('lll');

  return {
    key: key,
    url: url,
    created: created,
    updated: updated
  }
};
