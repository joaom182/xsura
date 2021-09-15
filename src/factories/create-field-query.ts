import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import { InstrospectionSchema } from '~services/get-introspection';
import { getFieldProperties } from '~helpers/get-field-properties';

export function createFieldQuery(
  field: string,
  introspection: InstrospectionSchema
) {
  const properties = getFieldProperties(field, introspection);

  return print(gql`
    {
        ${field} {
            ${properties.map((p) => ` ${p}`)}
        }
    }
  `);
}
