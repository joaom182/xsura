import { Argv } from 'yargs';
import { parseStringToKeyValueObject } from '~helpers/parse-string-to-key-value-object';
import { getFieldData } from '~services/get-field-data';
import { insertFieldData } from '~services/insert-field-data';
import { getIntrospection } from '~services/get-introspection';
import ora from 'ora';

export async function copy(
  fields: string[],
  source: string,
  sourceHeaders: { [key: string]: string },
  target: string,
  targetHeaders: { [key: string]: string }
) {
  const introspection = await getIntrospection(source, sourceHeaders);
  for (let field of fields) {
    let pos = fields.indexOf(field) + 1;
    let total = fields.length;
    let prefix = `${pos}/${total} [${field}]`;
    let spinner = ora(`${prefix} Fetching data`).start();
    try {
      let data = await getFieldData(
        source,
        sourceHeaders,
        field,
        introspection
      );
      spinner.text = `${prefix} Inserting ${data.length} records`;
      let response = await insertFieldData(
        target,
        targetHeaders,
        field,
        introspection,
        data
      );
      spinner.succeed(`${prefix} ${response.affected_rows || 0} rows inserted`);
    } catch (err: any) {
      spinner.fail(`${prefix} Failed: ${err?.message}`);
    }
  }
  ora().succeed(`Done!`);
}

export const COPY_COMMAND = (yargs: Argv<{}>) =>
  yargs.command(
    'copy [fields] [source] [source-headers] [target] [target-headers]',
    'copy data to a graphql server',
    (yargs: Argv<{}>) => {
      yargs
        .positional('fields', {
          describe: 'fields to query',
          default: '',
        })
        .positional('source', {
          describe: 'source hasura graphql endpoint',
          default: '',
        })
        .positional('source-headers', {
          describe: 'headers to authenticate source hasura graphql endpoint',
          default: '',
        })
        .positional('target', {
          describe: 'target hasura graphql endpoint',
          default: '',
        })
        .positional('target-headers', {
          describe: 'headers to authenticate target hasura graphql endpoint',
          default: '',
        });
    },
    async (argv: any) => {
      const fields = argv?.fields?.split(',') || [];
      const sourceHeaders = parseStringToKeyValueObject(argv['source-headers']);
      const targetHeaders = parseStringToKeyValueObject(argv['target-headers']);
      await copy(
        fields,
        argv.source,
        sourceHeaders,
        argv.target,
        targetHeaders
      );
    }
  );
