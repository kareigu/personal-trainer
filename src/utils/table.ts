import { ICustomer } from "./api";


export function createFilter(fields: string[]) {
  const set = [...new Set(fields)];
  return set.map(s => {
    return {
      text: s,
      value: s,
    }
  });
}