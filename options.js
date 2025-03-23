document.getElementById('saveButton').addEventListener('click', function() {
  const webhookUrl = document.getElementById('webhookUrl').value;
  const username = document.getElementById('username').value;
  const uid = document.getElementById('uid').value;

	// note: url validation more annoying than worth
	const bannedSites = [...document.getElementById('banned-websites').children]
		.map((node) => node.value)
		.filter((node) => node);
	console.log(bannedSites);

  chrome.storage.sync.set({ webhookUrl: webhookUrl, username: username, uid: uid, bannedSites: bannedSites }, function() {
		let msg = '';
    if (uid) {
      msg = 'Webhook URL, Username and UID saved.';
    } else {
      msg = 'Webhook URL and Username saved.';
    }
		if (bannedSites.length) {
      msg += '\nBanned sites saved.'
		} 
		document.getElementById('status').textContent = msg;
  });
});

document.getElementById("site-add").addEventListener("click", function() {
	let node = document.createElement('input');
	node.type = 'text';
	node.value = "";
	document.getElementById('banned-websites').appendChild(node);
})

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['webhookUrl', 'username', 'uid', 'bannedSites'], function(data) {
    if (data.webhookUrl) {
      document.getElementById('webhookUrl').value = data.webhookUrl;
    }
    if (data.username) {
      document.getElementById('username').value = data.username;
    }
    if (data.uid) {
      document.getElementById('uid').value = data.uid;
    }
		if (!data.bannedSites) {
			// default sites, first init.
			let node = document.createElement('input');
			node.type = 'text';
			node.value = "youtube.com";
			document.getElementById('banned-websites').appendChild(node);
			let node2 = document.createElement('input');
			node2.type = 'text';
			node2.value = "www.youtube.com";
			document.getElementById('banned-websites').appendChild(node2);
			chrome.storage.sync.set({ bannedSites: ['youtube.com', 'www.youtube.com'] })
		}
		else if (data.bannedSites && data.bannedSites.length > 0) {
			for (const site of data.bannedSites) {
				let node = document.createElement('input');
				node.type = 'text';
				node.value = site;
				document.getElementById('banned-websites').appendChild(node);
			}
		}
  });
});
