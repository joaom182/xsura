import { InstrospectionSchema } from '~services/get-introspection';

export function getFieldProperties(
  field: string,
  introspection: InstrospectionSchema
): string[] {
  const fields = introspection?.__schema?.queryType?.fields || [];
  const _field = fields?.find((f) => f.name === `${field}_by_pk`);

  return (
    _field?.type?.fields?.filter((f) => !f?.description).map((f) => f.name) ||
    []
  );
}
