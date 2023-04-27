import { createRequire } from 'module';

const get = createRequire(import.meta.url);
export default get('../package.json');
