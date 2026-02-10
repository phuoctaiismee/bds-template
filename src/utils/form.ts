export const getChangedValues = <T = Record<string, any>>(values: Partial<T>, initialValues: Partial<T>) => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const hasChanged = initialValues[key] !== value;
    if (hasChanged) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      acc[key] = value;
    }
    return acc;
  }, {});
};
