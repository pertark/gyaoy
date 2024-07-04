document.getElementById('saveButton').addEventListener('click', function() {
  const webhookUrl = document.getElementById('webhookUrl').value;
  const username = document.getElementById('username').value;

  chrome.storage.sync.set({ webhookUrl: webhookUrl, username: username }, function() {
    document.getElementById('status').textContent = 'Webhook URL and Username saved.';
  });
});

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['webhookUrl', 'username'], function(data) {
    if (data.webhookUrl) {
      document.getElementById('webhookUrl').value = data.webhookUrl;
    }
    if (data.username) {
      document.getElementById('username').value = data.username;
    }
  });
});
