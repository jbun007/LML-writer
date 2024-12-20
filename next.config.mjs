/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'oaidalleapiprodscus.blob.core.windows.net',
          pathname: '/**', // Match all paths
        },
      ],
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        // Exclude native modules from the server-side bundle
        config.externals.push({
          'onnxruntime-node': 'commonjs onnxruntime-node',
          'sharp': 'commonjs sharp',
        });
  
        // Optionally, exclude all .node binaries
        config.module.rules.push({
          test: /\.node$/,
          use: 'null-loader',
        });
      }
  
      return config;
    },
  };
  
  export default nextConfig;