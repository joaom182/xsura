import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import { InstrospectionSchema } from '~services/get-introspection';
import { getFieldProperties } from '~helpers/get-field-properties';

export function createFieldInsertMutation(
  field: string,
  introspection: InstrospectionSchema
) {
  const properties = getFieldProperties(field, introspection);
  return print(gql`
    mutation InsertMutation($objects: [${field}_insert_input!]!) {
        insert_${field}(objects: $objects, on_conflict: {
            constraint: ${field}_pkey,
            update_columns: [${properties.join(',')}]
        }) {
            affected_rows
        }
    }
  `);
}
