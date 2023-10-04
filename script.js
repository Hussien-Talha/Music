window.onload = function() {
    // Spotify API credentials
    const clientId = 'e7874d5d05394ecd86223fd300389ef1';
    const redirectUri = 'https://hussien-talha.github.io/Music/music.html';
  
    // Spotify API endpoints
    const authorizeEndpoint = 'https://accounts.spotify.com/authorize';
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const playerEndpoint = 'https://sdk.scdn.co/spotify-player.js';
  
    // Button and player elements
    const loginButton = document.getElementById('login-button');
    const playerDiv = document.getElementById('player');
  
    // Log in with Spotify button click event
    loginButton.addEventListener('click', function() {
      // Redirect user to Spotify authorization page
      window.location = `${authorizeEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
    });
  
    // Check if the user is already logged in
    if (window.location.hash) {
      const hashParams = parseHashParams(window.location.hash.substring(1));
      if (hashParams.access_token) {
        // User is already logged in, initialize the Spotify player
        initializePlayer(hashParams.access_token);
      }
    }
  
    // Function to parse hash parameters from the URL
    function parseHashParams(hash) {
      const params = hash.split('&');
      const result = {};
      for (let i = 0; i < params.length; i++) {
        const param = params[i].split('=');
        result[param[0]] = decodeURIComponent(param[1]);
      }
      return result;
    }
  
    // Function to initialize the Spotify player
    function initializePlayer(accessToken) {
      // Load Spotify Player SDK
      const script = document.createElement('script');
      script.src = playerEndpoint;
      script.onload = function() {
        // Initialize Spotify Player
        window.onSpotifyWebPlaybackSDKReady = function() {
          const player = new Spotify.Player({
            name: 'Web Playback SDK Template',
            getOAuthToken: function(callback) {
              callback(accessToken);
            }
          });
  
          // Connect to the Spotify player
          player.connect().then(success => {
            if (success) {
                console.log('The Spotify player is connected!');
            }
          });
  
          // Add event listeners to the player
          player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
          });
  
          player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
          });
        };
      };
  
      // Append the Spotify Player SDK script to the document
      document.body.appendChild(script);
    }
  }
    