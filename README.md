# Morseboard
Show text messages by flashing your Mac keyboard lights in Morse code. Yes really.

## Quick start

You're going to need the following:

 - [node](http://nodejs.org) and [yarn](https://yarnpkg.com/)
 - a [Nexmo](https://nexmo.com) account and a rented number
 - [ngrok](http://ngrok.com)
 - the ability to read Morse code, or an appreciation of flashing lights


    ```
    # This will start a node server running on port 3000
    git clone git@github.com:aaronbassett/morseboard.git
    cd morseboard
    yarn
    yarn start

    # In a new terminal
    ngrok http 3000
    ```

Copy the Forwarding address from your ngrok terminal and [update your virtual
number in Nexmo](https://dashboard.nexmo.com/your-numbers) to use that
address as your SMS Webhook URL. Ensure that your `HTTP Method` is set to `POST-JSON`
in your [Nexmo settings](https://dashboard.nexmo.com/settings).

## kbrightness

Thanks to [pirate/mac-keyboard-brightness](https://github.com/pirate/mac-keyboard-brightness)
for `kbrightness`
