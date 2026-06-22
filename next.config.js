module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
}

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
