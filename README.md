# trends
A simple Universal App to display trends on twitter

A demo app for setting up Universal Javascript projects, using react, redux and how to test each component.
To run the application you will need a twitter developer account and access to your consumerKey and Secret.
These keys are not exposed in anyway, however to autherize your application you will need to enter these credentials
into the config.

To get started 

 * git clone
 * npm install
 * open config.template.js and enter your twitter consumerKey, consumerSecret
 * rename/move config.template.js -> config.js
 * npm run api (runs a small server to communicate with twitter's api) - run in a seperate terminal window.
 * npm run dev (runs a small server to host the application)
 * go to localhost:8080
 
The application comprises of two small webservers, one to how the application and the other to make api requests.
The host of the application will initially load the data from twitter to render the react app server side.
Once on the client, the application works like a SPA, the trends request goes firstly to the api server running,
which in turn communicates to twitter on your behalf to not expose any apikeys to the public.

though the application is simple, it demonstrates how to set up and write universal apps using react, redux and webpack.
This allows you to write testible and reliable web applications which shares code accross sever and browser.  You also 
end up with a interactive SPA without the headaches of initial page load times and SEO bot crawlers not being able to index
your site.

If you're interest in wiritng your own web application see my [Universal Web Application Generator](https://github.com/HistoireDeBabar/generator-universal-react-and-redux) to get started 
