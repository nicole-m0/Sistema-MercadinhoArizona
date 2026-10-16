import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './e2e-commercial',
  use: {baseURL:'http://127.0.0.1:5176', launchOptions:{channel:'chrome'}},
  webServer: {
    command:'node scripts/serve-public-demo.mjs --commercial',
    url:'http://127.0.0.1:5176', reuseExistingServer:false,
  },
  projects:[
    {name:'desktop', use:{viewport:{width:1440,height:900}}},
    {name:'mobile', use:{viewport:{width:390,height:844},isMobile:true,hasTouch:true}},
  ],
});
