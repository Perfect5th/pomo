## Pomo - Another Pomodoro Timer

This is a single-page pomodoro timer built using [Create React App](https://github.com/facebookincubator/create-react-app).

Currently hosted [on my site](http://mitchellburton.ca/pomo/).

#### Current features:
- A timer (duh)
  - Starts, stops, and pauses - all the fancies a timer should have
- Pomos are hardcoded at 25 minutes currently, short breaks at 5 minutes, long ones at 15 minutes
- One long break after every 4 Pomos
- Desktop notifications
- _Insane_ complicated stats tracking (shows you how many Pomos you&rsquo;ve done this session)

#### Planned features:
- Persistence between active sessions
- _Super insane_ stats tracking
- Customizable Pomo and break lengths
- Easter eggs because people eat that shit up
- Other stuff I assume

#### Development

Create React App makes this all super simple. Once you&rsquo;ve cloned the repository and `npm install`ed or `yarn install`ed all the shiny bojangles, it&rsquo;s as simple as running `npm start` (`yarn start`, shutup already) to serve the app and watch changes.

#### Building for Production

Because we (I) run such a fantastically tight ship around here, I&rsquo;m even going to tell you how to build for production. You can pay me/us later.

- Do the thing: `npm run build`
- Install the thing: `npm install -g serve`
- Do the other thing: `serve -s build`*

(imagine that I also wrote the yarn commands for these)

*_n.b._: for this to work properly, you may need to remove the "homepage" item in package.json (go figure)
