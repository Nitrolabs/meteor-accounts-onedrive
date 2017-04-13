# accounts-onedrive

OneDrive (Microsoft Account) OAuth2 login service for use with Meteor Accounts system.

## Usage

1. `meteor add nitrolabs:accounts-onedrive`
2. Register the app on [Microsoft Developers](https://account.live.com/developers/applications/).<br>
3. Read the 'Meteor.loginWith&lt;ExternalService&gt;' section of the [Meteor docs](http://docs.meteor.com/#meteor_loginwithexternalservice) and make sure you set up your config and secret correctly.   
4. Call `Meteor.loginWithOnedrive();`

Due to Microsofts strict policies on authentication redirects, this app can not 
be tested on localhost. The redirect url must be set to a real domain. One workaround
is to edit the host file on your machine to make localhost look like a real domain (localhostsite.com/mysite)

### Credits

Developed by @maxkferg.

Maintained by [Nitrolabs](https://www.nitrolabs.com)

### Licence
MIT
