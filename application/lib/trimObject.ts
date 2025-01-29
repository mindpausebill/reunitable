export const trimObject = (object: Record<string, string>) => {
  const newObject: Record<string, string> = {};

  Object.entries(object).forEach(([key, value]) => {
    newObject[key] = value.trim();
  });

  return newObject;
};
