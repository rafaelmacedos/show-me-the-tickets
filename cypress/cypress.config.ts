import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });

export default defineConfig({
  e2e: {
    supportFile: 'support/e2e.ts',
    specPattern: 'e2e/**/*.cy.ts',
    video: false,
    screenshotOnRunFailure: false,
    env: {
      API_BASE_URL: process.env.API_BASE_URL,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    },
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
});