// Templates
const linkRowTemplate = Handlebars.compile(`
  <tr>
    <td><a href="r/{{key}}">{{key}}</a></td>
    <td><a href="{{url}}">{{url}}</a></td>
    <td>{{updated}}</td>
    <td>{{created}}</td>
  </tr>
`);
const removeStatusTemplate = Handlebars.compile(`
  removed key {{key}}
`);

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

  data.forEach(row => {
    const linkRowData = renderLinkData(row);
    const linkRowHtml = linkRowTemplate(linkRowData);
    tableData.append(linkRowHtml);
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
  $('#status').html(removeStatusTemplate(data));
};

const renderLinkData = data => {
  let key = data.key;
  let url = data.url;
  let created = data.created;
  let updated = data.updated;

  created = moment.utc(created).local().format('lll');
  updated = moment.utc(updated).local().format('lll');

  return {
    key: key,
    url: url,
    created: created,
    updated: updated
  }
};
