const notifier = require('node-notifier');
const path = require('path');
// Simple notification
notifier.notify({
  title: 'My Notification',
  message: 'Hello, this is a notification from node-notifier!',
  sound: true, // Only Notification Center or Windows Toasters
  wait: true   // Wait with callback until user action is taken on notification
}, (err, response, metadata) => {
  if (err) {
    console.error('Notification error:', err);
  } else {
    console.log('Notification response:', response);
    console.log('Notification metadata:', metadata);
  }
});

// Advanced example with options
notifier.notify({
  title: 'Advanced Notification',
  message: 'This notification has more options.',
  icon: path.join(__dirname, 'icon.png'), // Absolute path (doesn't work on balloons)
  sound: 'Ping', // Case Sensitive string for location of sound file, or use one of the predefined sounds
  wait: true, // Wait for User Action against Notification or times out. Same as timeout = 5 seconds

  // The following options are specific to Windows
  appID: 'com.myapp.id', // Windows only. Refer to the documentation for more info
  timeout: 5, // Takes precedence over wait if both are defined
  closeLabel: 'Close', // Action button label on Windows
  actions: 'Open', // Actions buttons (Windows and Mac)

  // The following options are specific to macOS
  dropdownLabel: 'Options', // Dropdown label on Mac
  reply: true // Allow the user to reply (macOS only)
}, (err, response, metadata) => {
  if (err) {
    console.error('Notification error:', err);
  } else {
    console.log('Notification response:', response);
    console.log('Notification metadata:', metadata);
  }
});