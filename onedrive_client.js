OneDrive = {};

// Request OneDrive credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
OneDrive.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'onedrive'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }
  var credentialToken = Random.secret();

  var scope = (options && options.requestPermissions) || ["wl.basic","wl.skydrive","wl.emails","wl.offline_access"];
  var flatScope = _.map(scope, encodeURIComponent).join('+');

  var loginStyle = OAuth._loginStyle('onedrive', config, options);

  var loginUrl =
    'https://login.live.com/oauth20_authorize.srf' +
    '?client_id=' + config.clientId +
    '&scope=' + flatScope +
    '&response_type=code' +
    '&redirect_uri=' + encodeURI(OAuth._redirectUri('onedrive', config)) +
    '&state=' + OAuth._stateParam(loginStyle, credentialToken);
  OAuth.launchLogin({
    loginService: "onedrive",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: {width: 900, height: 450}
  });
};
