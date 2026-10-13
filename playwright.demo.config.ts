import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './e2e-public',
  use: {baseURL: process.env.DEMO_TEST_URL ?? 'http://127.0.0.1:5175', launchOptions: {channel: 'chrome'}},
  webServer: process.env.DEMO_TEST_URL ? undefined : {
    command: 'node scripts/serve-public-demo.mjs', url: 'http://127.0.0.1:5175', reuseExistingServer: false,
  },
  projects: [
    {name: 'desktop', use: {viewport: {width: 1440, height: 900}}},
    {name: 'mobile', use: {viewport: {width: 390, height: 844}, isMobile: true, hasTouch: true}},
  ],
});
