// Get the access token from the URL
const urlParams = new URLSearchParams(window.location.search);
const accessToken = urlParams.get('access_token');

// Fetch currently playing track from Spotify API
fetch('https://api.spotify.com/v1/me/player/currently-playing', {
  headers: {
    'Authorization': 'Bearer ' + accessToken
  }
})
  .then(response => response.json())
  .then(data => {
    if (data.item) {
      const trackName = data.item.name;
      const artistName = data.item.artists[0].name;

      document.getElementById('track-name').textContent = trackName;
      document.getElementById('artist-name').textContent = artistName;
    } else {
      document.getElementById('track-name').textContent = 'No track currently playing';
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

// ... previous code ...

// Play button click event
document.getElementById('play-btn').addEventListener('click', () => {
    fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
      .then(response => {
        if (response.status === 204) {
          console.log('Playback started');
        } else {
          console.error('Playback failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  
  // Pause button click event
  document.getElementById('pause-btn').addEventListener('click', () => {
    fetch('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
      .then(response => {
        if (response.status === 204) {
          console.log('Playback paused');
        } else {
          console.error('Playback failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  
