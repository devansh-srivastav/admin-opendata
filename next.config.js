/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  
   // by next.js will be dropped. Doesn't make much sense, but how it is
            fs: false, // the solution
            dgram:false

    
}

module.exports = nextConfig
