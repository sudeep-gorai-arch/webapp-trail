import type { NextConfig } from "next";


const nextConfig: NextConfig = {


    images: {


        // allow LAN/private IP image optimization
        dangerouslyAllowLocalIP: true,


        remotePatterns: [


            {
                protocol: "https",

                hostname: "picsum.photos",
            },



            {
                protocol: "http",

                hostname: "192.168.1.12",

                port: "5000",

                pathname: "/uploads/**",
            },



            {
                protocol: "http",

                hostname: "localhost",

                port: "5000",

                pathname: "/uploads/**",
            },


        ],


    },


};


export default nextConfig;