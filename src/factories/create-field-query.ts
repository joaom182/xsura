import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import { InstrospectionSchema } from '~services/get-introspection';
import { getFieldProperties } from '~helpers/get-field-properties';

export function createFieldQuery(
  field: string,
  introspection: InstrospectionSchema
) {
  const properties = getFieldProperties(field, introspection);

  if (!properties.length)
    throw new Error(
      `${field} field does not exist or dont contain a primary key`
    );

  return print(gql`
    {
        ${field} {
            ${properties.map((p) => ` ${p}`)}
        }
    }
  `);
}
