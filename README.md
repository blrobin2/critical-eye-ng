# CriticalEyeNg

This is the third iteration of my Critical Eye application, a way for you to track and rate the music you listen to.

* The first iteration was jQuery and localStorage
* The second iteration used React and localStorage, with some shoddy OAuth through Spotify and Passport
* This iteration uses Angular and MongoDB, simplifying the authentication path (using JWT Bearer Tokens to keep the server relatively stateless [the Spotify API keeps track of tokens and refreshes on each request to keep from possibly relying on stale tokens]) and storing reviews in a cloud server instead of in localStorage.

I try to apply best practices as I learn them and to keep the code as decoupled as possible. I'm always open to learning of a way to do something better.

## USAGE
If you want to use this project:
* You'll need an `.env` file in the `server` folder for server config
* You'll need an `app.config.ts` file in the `src/app` folder for client config

In both cases, this is meant to protect sensitive data, as well as allow for development and production environments

## TODO
* Integrating Aggr for music recommendation page
  * I have the page, but need to write way to regularly update it
* See other user's reviews for the same album
* Upvote system for other's reviews?
  * Fanboying may prevent it from being that useful
  * Would not have downvote to prevent brigading

## CONSIDERATIONS
* Should I store the token in localStorage or let Angular's router pass the token around? The former seems to keep concerns separate (although it does make the app more stateful), whereas the latter introduce the token as a property of the component that needs it, that then has to be fed to the AuthInterceptor (or removes the Interceptor altogether?)
* I use `ngDoCheck` in the ReviewFormComponent as a way to subscribe to when the form is dirty. I hate it, but every other solution I find is so complex that it may be worth waiting for a native solution within the framework
