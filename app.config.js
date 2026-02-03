require('dotenv').config()
const appJson = require('./app.json')

/**
 * When running the app on a physical device (iPhone/Android), the device cannot
 * reach "localhost" — that refers to the device itself. Set your Mac's local IP
 * so the device can reach the backend on the same WiFi.
 *
 * Find your Mac IP: System Settings > Network, or run: ipconfig getifaddr en0
 * The IP is set in .env file, or you can override by running:
 *   EXPO_PUBLIC_API_HOST=192.168.1.133 npx expo start
 */
const apiHost = process.env.EXPO_PUBLIC_API_HOST || 'localhost'

module.exports = {
    expo: {
        ...appJson.expo,
        extra: {
            apiHost,
        },
    },
}
