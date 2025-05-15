/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects(){
        return [
            {
                source : "/",
                destination: "/sign-in",
                permanent: true,
            }
        ]
    },
    compiler:{
        removeConsole: process.env.NODE_ENV === "production",
    },
    reactStrictMode : true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use : ["@svgr/webpack"]
        })
        return config;
    }
};

export default nextConfig;
