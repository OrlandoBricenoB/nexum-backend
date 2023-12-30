export const getObjectProperties = (object: { [key: string]: unknown }) => {
  const properties = Object.keys(object);
  const newObject: { [key: string]: unknown } = {};

  for (let property of properties) {
    newObject[property] = object[property];
  }

  return newObject;
}
