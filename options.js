document.getElementById('saveButton').addEventListener('click', function() {
  const webhookUrl = document.getElementById('webhookUrl').value;
  const username = document.getElementById('username').value;
  const uid = document.getElementById('uid').value;

  chrome.storage.sync.set({ webhookUrl: webhookUrl, username: username, uid: uid }, function() {
    if (uid) {
      document.getElementById('status').textContent = 'Webhook URL, Username and UID saved.';
    } else {
      document.getElementById('status').textContent = 'Webhook URL and Username saved.';
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['webhookUrl', 'username', 'uid'], function(data) {
    if (data.webhookUrl) {
      document.getElementById('webhookUrl').value = data.webhookUrl;
    }
    if (data.username) {
      document.getElementById('username').value = data.username;
    }
    if (data.uid) {
      document.getElementById('uid').value = data.uid;
    }
  });
});
