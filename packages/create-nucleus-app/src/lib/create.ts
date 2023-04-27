import ora from "ora";
import chalk from "chalk";
import fs from "fs-extra";
import pkg from 'enquirer';
const { prompt: Prompt } = pkg;


import logError from "../utils/logError.js";

const databases = {
  "supabase": "supabase"
}

const create =  async (pkg: string, opts: { database: string }) => {

  console.log(opts)

  const bootSpinner = ora(`Creating ${chalk.bold.green(pkg)}...`);
  let db;

  async function getProjectPath(projectPath: string): Promise<string> {
    const exists = await fs.pathExists(projectPath);
    if (!exists) {
      return projectPath;
    }

    bootSpinner.fail(`Failed to create ${chalk.bold.red(pkg)}`);
    const prompt = await Prompt<{ 'pkg-name': string }>({
      type: 'input',
      name: 'pkg-name',
      message: `A folder named ${chalk.bold.red(
        pkg
      )} already exists! ${chalk.bold('Choose a different name')}`,
      initial: pkg + '-1',
      result: (v: string) => v.trim()
    });

    pkg = prompt["pkg-name"];

    projectPath = (await fs.realpath(process.cwd())) + '/' + pkg;
    bootSpinner.start(`Creating ${chalk.bold.green(pkg)}...`);
    return await getProjectPath(projectPath); // recursion!
  }

  try {
    const realPath = await fs.realpath(process.cwd());
    const projectPath = await getProjectPath(realPath + '/' + pkg);

    const getDB = async () => {
      const dbPrompt = await Prompt<{ database: string }>({
        type: 'select',
        name: 'database',
        message: 'Choose a database',
        choices: Object.keys(databases),
      });
      db = dbPrompt.database;
    }

    if (opts.database) {
      db = opts.database.trim();
      if (!Object.keys(databases).includes(db)) {
        bootSpinner.fail(`Invalid template ${chalk.bold.red(db)}`);
        await getDB();
      }
    } else {
      await getDB();
    }

    bootSpinner.start();

    // create dir
    await fs.mkdir(projectPath);

    bootSpinner.succeed(`Created ${chalk.bold.green(pkg)}`);

  } catch (error) {
    bootSpinner.fail(`Failed to create ${chalk.bold.red(pkg)}`);
    logError(error);
    process.exit(1);
  }
}

export default create;
