export function parseStringToKeyValueObject(value: string) {
  let fields = value.split(',');
  let obj: any = {};

  fields.forEach((field) => {
    let [key, value] = field.split('|');
    obj[key] = value;
  });

  return obj;
}
