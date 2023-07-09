/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias['@elastic/eui/lib'] = '@elastic/eui/dist/eui';
        }    

        return config;
    },
}

module.exports = nextConfig
