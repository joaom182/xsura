import axios from 'axios';
import { createFieldQuery } from '~factories/create-field-query';
import { InstrospectionSchema } from './get-introspection';

export async function getFieldData(
  graphQlUrl: string,
  headers: { [key: string]: string },
  field: string,
  introspection: InstrospectionSchema
): Promise<[]> {
  const query = createFieldQuery(field, introspection);
  const { data } = await axios.post(
    graphQlUrl,
    {
      query,
    },
    {
      headers,
    }
  );

  const response = data.data[field] || [];
  return response;
}
