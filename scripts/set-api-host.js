#!/usr/bin/env node
/**
 * Sets EXPO_PUBLIC_API_HOST in .env to this machine's local IP
 * so the Expo app on a physical device can reach the backend.
 * Run automatically before `npm start` or run manually: npm run set-api-host
 */

const fs = require('fs')
const os = require('os')
const path = require('path')
const {execSync} = require('child_process')

const ROOT = path.resolve(__dirname, '..')
const ENV_PATH = path.join(ROOT, '.env')
const ENV_EXAMPLE_PATH = path.join(ROOT, '.env.example')

function getLocalIp() {
    const platform = os.platform()

    if (platform === 'darwin') {
        try {
            const ip = execSync('ipconfig getifaddr en0', {encoding: 'utf8'}).trim()
            if (ip) return ip
        } catch {
            // en0 not available (e.g. no WiFi)
        }
    }

    if (platform === 'win32') {
        try {
            const out = execSync('ipconfig', {encoding: 'utf8'})
            const match = out.match(/IPv4 Address[.\s]*:\s*(\d+\.\d+\.\d+\.\d+)/)
            if (match) return match[1]
        } catch {
            // fallback to networkInterfaces
        }
    }

    const nets = os.networkInterfaces()
    for (const name of ['en0', 'eth0', 'Wi-Fi', 'Ethernet']) {
        const iface = nets[name]
        if (!iface) continue
        for (const config of iface) {
            if (config.family === 'IPv4' && !config.internal) return config.address
        }
    }

    for (const ifaces of Object.values(nets)) {
        for (const config of ifaces) {
            if (config.family === 'IPv4' && !config.internal) return config.address
        }
    }

    return null
}

function main() {
    const ip = getLocalIp()
    if (!ip) {
        console.warn('set-api-host: Could not detect local IP. Leave EXPO_PUBLIC_API_HOST in .env as-is.')
        process.exit(0)
        return
    }

    let content
    if (fs.existsSync(ENV_PATH)) {
        content = fs.readFileSync(ENV_PATH, 'utf8')
        if (content.includes('EXPO_PUBLIC_API_HOST=')) {
            content = content.replace(/EXPO_PUBLIC_API_HOST=.*/m, `EXPO_PUBLIC_API_HOST=${ip}`)
        } else {
            content = `${content.trimEnd() + (content.endsWith('\n') ? '' : '\n')}EXPO_PUBLIC_API_HOST=${ip}\n`
        }
    } else {
        content = fs.existsSync(ENV_EXAMPLE_PATH)
            ? fs.readFileSync(ENV_EXAMPLE_PATH, 'utf8').replace(/EXPO_PUBLIC_API_HOST=.*/m, `EXPO_PUBLIC_API_HOST=${ip}`)
            : `# Auto-generated. Local IP for device-to-backend connection.\nEXPO_PUBLIC_API_HOST=${ip}\n`
    }

    fs.writeFileSync(ENV_PATH, content, 'utf8')
    console.log(`set-api-host: EXPO_PUBLIC_API_HOST=${ip}`)
}

main()
