import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Old English routes stay reachable (bookmarks, search results, links already sent).
  // The URL fragment (#…) carrying the result survives the redirect in browsers.
  async redirects() {
    return [
      { source: '/draw', destination: '/losowanie', permanent: true },
      { source: '/donation', destination: '/dotacja', permanent: true },
      { source: '/r', destination: '/wynik', permanent: true }
    ];
  }
};

export default nextConfig;
