import axios from 'axios';
import ora from 'ora';
import { createFieldInsertMutation } from '~factories/create-field-insert-mutation';
import { InstrospectionSchema } from './get-introspection';

export async function insertFieldData(
  graphQlUrl: string,
  headers: { [key: string]: string },
  field: string,
  introspection: InstrospectionSchema,
  objects: [] = []
): Promise<{ affected_rows: number }> {
  const query = createFieldInsertMutation(field, introspection);
  const { data } = await axios.post(
    graphQlUrl,
    {
      operationName: 'InsertMutation',
      query,
      variables: {
        objects,
      },
    },
    {
      headers,
    }
  );

  const errors: any[] = data?.errors || [];
  errors.forEach((err) => {
    ora().fail(err.message);
  });

  if (errors.length > 0) {
    return { affected_rows: 0 };
  }

  return data.data[`insert_${field}`] || { affected_rows: 0 };
}
