import { Command } from "commander";
import { startUrlChecker } from "./checker";
import { env } from "./env";

const program = new Command();

program
  .version("1.0.0")
  .description("Check the status of APIs from a URL file")
  .option("-f, --file <path>", "Arquivo contendo as URLs", "urls.json")
  .action(async (options) => {
    await startUrlChecker(options.file, env.INTERVAL);
  });

program.parse(process.argv);
