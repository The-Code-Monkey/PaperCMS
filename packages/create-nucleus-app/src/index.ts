#!/usr/bin/env node
import sade from 'sade';

import create from './lib/create.js';
import pkg from './utils/getPkgJson.js';

const prog = sade('nucleus');

prog
  .version(pkg.version)
  .command('create <name>')
  .describe('Create a new Nucleus CMS')
  .example('create MyCMS')
  .option('--database, --db', `Specify a database`)
  .action(create);

prog.parse(process.argv);
