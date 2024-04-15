import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';
import { writable } from 'svelte/store';

// Database
const db = new GUN({
    // Replace with your actual GunDB instance URL
    url: 'https://icy-sea-0528.on.fleek.co/gun',
    // Use the 'ws' transport for WebSocket connection
    transport: 'ws'
  });

// Gun User
export const user = db.user().recall({sessionStorage: true});

// Current User's username
export const username = writable('');

user.get('alias').on(v => username.set(v))

db.on('auth', async(event) => {
    const alias = await user.get('alias'); // username string
    username.set(alias);

    console.log(`signed in as ${alias}`);
});