

export function createFilter<T>(fields: T[]) {
  const set = [...new Set(fields)];
  return set.map(s => {
    return {
      text: s,
      value: s,
    }
  });
}