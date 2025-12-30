module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@': './src',
                        '@/features': './src/features',
                        '@/shared': './src/shared',
                        '@/components': './src/shared/components',
                        '@/utils': './src/shared/utils',
                        '@/types': './src/shared/types',
                        '@/constants': './src/shared/constants',
                        '@/hooks': './src/shared/hooks',
                        '@/services': './src/shared/services',
                        '@/navigation': './src/shared/navigation',
                        '@/store': './src/shared/store',
                    },
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
                },
            ],
        ],
    }
}
