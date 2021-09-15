import axios from 'axios';
import { print } from 'graphql/language/printer';
import { gql } from 'graphql-tag';

export interface InstrospectionSchema {
  __schema: {
    queryType: {
      fields: [
        {
          name: string;
          type: {
            fields: [
              {
                name: string;
                description: string;
              }
            ];
          };
        }
      ];
    };
  };
}

export async function getIntrospection(
  graphQlUrl: string,
  headers: { [key: string]: string }
): Promise<InstrospectionSchema> {
  const { data } = await axios.post(
    graphQlUrl,
    {
      query: print(gql`
        query {
          __schema {
            queryType {
              fields {
                name
                type {
                  fields {
                    name
                    description
                  }
                }
              }
            }
          }
        }
      `),
    },
    {
      headers,
    }
  );

  return data?.data || ({} as InstrospectionSchema);
}
