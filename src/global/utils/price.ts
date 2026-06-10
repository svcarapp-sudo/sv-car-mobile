/**
 * Single source of truth for price formatting.
 *
 * Gulf marketplace convention (Noon, Haraj, Dubizzle, OpenSooq): prices are
 * shown with Western (ASCII) digits and comma grouping even inside the Arabic
 * UI. This also matches the app's numeric inputs, which normalise Arabic-Indic
 * digits to ASCII before storing values.
 */
const priceFormatter = new Intl.NumberFormat('en-US', {maximumFractionDigits: 0})

export const formatPrice = (value: number): string => priceFormatter.format(value)
