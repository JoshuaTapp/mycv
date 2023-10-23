import { rm } from 'fs/promises';
import { join } from 'path';

// rm test.sqlite before every e2e test
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (error) {}
});
