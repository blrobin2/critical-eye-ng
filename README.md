# CriticalEyeNg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

This is the third iteration of my Critical Eye application, a way for you to track and rate the music you listen to.

* The first iteration was jQuery and localStorage
* The second iteration used React and localStorage, with some shoddy OAuth through Spotify and Passport
* This iteration uses Angular and MongoDB, simplifying the authentication path (using JWT Bearer Tokens to keep the server relatively stateless [the Spotify API keeps track of tokens and refreshes on each request to keep from possibly relying on stale tokens]) and storing reviews in a cloud server instead of in localStorage.

Since this is my first Angular application by myself, the organization leaves something to be desired, but I plan on cleaning that up. Plus, there's some data in the client that needs to be stored in environment variables. Overall, though, I'm happy with the result and feel like this is much more managable and extensible than the previous iterations.