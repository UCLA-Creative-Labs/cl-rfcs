---
rfc pr: [#4](https://github.com/UCLA-Creative-Labs/cl-rfcs/pull/4)
tracking issue: https://github.com/UCLA-Creative-Labs/cl-rfcs/issues/2
---

# Group Spotify Playlists

A web app that takes a group of users and a theme and creates a playlist
of songs which match the group's collective tastes and the theme.

## Blurb

This project is intended to take Spotify's new (beta) feature,
Blends, and extend it to groups. Additionally, we want to allow for choosing an
overall theme for the generated playlist; so that a single group could perhaps
generate multiple playlists for different ocassions.

The project is meant for, well, pretty much anyone who listens to music. A PWA
would be ideal for such a project, since it will include a means of forming
groups, choosing a theme, and playing the generated playlist.

### Future goals

* This project could additionally just become a means to form a collaborative queue,
  where users can freely add and remove songs to a queue from their own phones.
* It would be really cool if the user could type in, in their own words, a desired theme,
  and using NLP or something along those lines we could figure out what a playlist would
  look like. [This article is very interesting] (thanks @sriramb2000).

[This article is very interesting]: https://github.com/UCLA-Creative-Labs/cl-rfcs/issues/2

## Why are we doing this?

Spotify's Blends are cool, but they're still limited. Being able to listen to
things as a group would be a great feature to have. Also, being able to generate
group playlists based on themes would be great to have for all kinds of events
and occasions---saves everyone the trouble of passing the phone around and searching
up songs.

## What is the high level design/implementation?

The best plan of attack for this project would be to create a PWA. Realistically, this
would be a mobile-first application, but by creating a PWA we can a) support desktop
and b) avoid working with something like React Native (bleh) but still achieve cross-
platform support.

This project has a few key components:
* Creating and managing a group/lobby
* Generating a playlist
* Playing music from the playlist

Let's delve into these in more detail.

#### Creating and managing a group/lobby

In this project, users should be able to join a private, protected group. We could probably
accomplish this using a standard lobby system: one person acts as the host and creates the
lobby and receives a unique code; users who then enter this code can enter that particular
lobby.

We could probably set something like this up with a simple document database. Whenever a host
creates a lobby, a new document is created with a unique identifying code. Then, if another
user enters that code, their ID is added to the document. The document might look something
like this:
```json
"<unique id>": {
  "host_id": "<host id>",
  "users": {
    "<user id>": {
      ...interesting data...
    }
  }
}
```
Furthermore, the actual lobby ID should be short or memorable. Looking into [human-readable IDs]
seems promising.

[human-readable IDs]: https://www.npmjs.com/package/human-readable-ids

In the interim, something like Firebase Firestore should be enough. It might be a good idea
to switch to something else (like MongoDB perhaps) if we want to worry about scaling and
whatnot.

We could achieve persistent groups by just keeping these unique identifiers persistent, i.e.
not deleting them. This way, the host and any other users can re-enter groups they are a part
of by just entering their unique code.

#### Generating a playlist

Here's the meat of the project. We would make heavy use of the [Spotify API] and all of the
information available about individual tracks here.

First, we need a list of themes that the user can choose from. Some suggestions are "road trip",
"party", or "kickback". Then, we would have to correlate each theme with a set of track features,
such as genre.

As a further goal, we could allow a secondary level of customization. For example, some people's
idea of what genres of music are approriate for a kickback can vary wildly from that of other
people, so it would be nice if we could offer users some extra control.
[This page on emoji-themed playlists] seems like a cool idea.

[This page on emoji-themed playlists]: https://kal.im/creating-spotify-playlists-with-emojis/

Alternatively or additionally, we could add a little blurb with the playlist types to make it
more explicit what we think is appropriate for each occasion.

We would also need to understand the users' music preferences. Again, we would pull things like
favorite (recent?) genres and figure out areas of strongest intersection between users. For more
detailed and accurate playlist generation, we should take into account the playlist theme. For
example, if the theme indicates that the users want throwbacks, then it would be more appropriate
to pull from their all-time or older favorites more so than recent listens.

Finally, we want to take the features prescribed by the desired theme and the features that are
most common among users, and pull songs that match as many of these features as possible.

Playlist generation would of course be performed on the server side. Also, the playlist would be
initially created under a Spotify account dedicated to our app and subsequently shared with every
member of the lobby. This way, we don't have to synchronize multiple users' libraries, and updates
would only apply to a single playlist. This makes our lives a lot easier.

[Spotify API]: https://developer.spotify.com/documentation/web-api/

#### Playing music from the playlist

Spotify offers a [playback SDK] to play music from Spotify on the client side. Combined with the
[web API] for playback controls, we have a way for music to be played directly from our application.

[playback SDK]: https://developer.spotify.com/documentation/web-playback-sdk/
[web API]: https://developer.spotify.com/documentation/web-api/

### What are the requirements for this project?

The PWA itself will probably be built in Next.js (strictly speaking, this won't be necessary for
our MVP (see below), but it will be a good idea for future-proofing), and the backend will be
Node.js-based. If we proceed with using Firestore for handling user lobbies to start with, then anyone with Firebase experience would be handy.

We have two options for generating playlists:
* We could use OCI to host a server for generating playlists.
* We could use a serverless system.

If we use a server-based model using something like OCI, then we would need to set up more
infrastructure. This might be a good learning experience for those members who are less experienced
with OCI, and it also may be cool to show the OCI team what we've been working on so we can get
more free stuff. Also, OCI makes it easier to scale.

If we use serverless, then we would need to set up a way to prevent too many playlist updates at
once. One way to accomplish that is:
1. Whenever a user logs in, save the user's data that is needed for playlist creation into their
   appropriate entry in Firestore.
2. Run a pub/sub serverless function that checks for updates every hour in a given user's data
   field. If the data is constant, we can skip the update; otherwise, we run the update to the
   playlist.

Note that we need to be careful about concurrency issues.

### What are we launching today?
The most important component of this project is themed group playlist generation. We also want to
implement in-app playlist playback in order to have users repeatedly coming to our web app. Also,
keeping users signed in will make it easier to (simulatedly) auto-update the playlist.

We should focus on actually figuring out how to match a group of users' tastes with a theme, and
to construct a collaborative playlist that actually makes sense given the input parameters.

## FAQ

> Working backwards, what are some questions a user, developer, designer, marketer
> have regarding the project? Answering these questions ahead of time will make
> the development process smoother and better for everyone involved.

<!-- ## Appendix

Leave your images, graphs, videos, links, explanations here!-->
