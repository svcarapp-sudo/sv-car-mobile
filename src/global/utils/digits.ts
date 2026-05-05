/**
 * Convert Arabic-Indic (٠-٩, U+0660–U+0669) and Extended Arabic-Indic / Persian
 * (۰-۹, U+06F0–U+06F9) digits in a string to ASCII (0-9). All other characters
 * pass through unchanged.
 *
 * Used at the onChangeText boundary of numeric inputs so that values stored in
 * state are always ASCII — keeps `parseFloat` / `parseInt` working regardless of
 * the user's keyboard, and ensures consistent payloads sent to the backend.
 */
export const toAsciiDigits = (input: string): string => {
    if (!input) return input
    let out = ''
    for (let i = 0; i < input.length; i++) {
        const code = input.charCodeAt(i)
        if (code >= 0x0660 && code <= 0x0669) {
            out += String.fromCharCode(code - 0x0660 + 0x30)
        } else if (code >= 0x06f0 && code <= 0x06f9) {
            out += String.fromCharCode(code - 0x06f0 + 0x30)
        } else {
            out += input[i]
        }
    }
    return out
}
