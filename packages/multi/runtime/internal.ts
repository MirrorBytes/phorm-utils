import type { Maybe, IndexableJsonValue, Path } from './types';

export function selectPath(
  val: IndexableJsonValue,
  path: Maybe<Path> | undefined,
): IndexableJsonValue | IndexableJsonValue[] | undefined {
  if (!path) return;

  const len = path.length;

  if (len === 0) return;

  let tracker = -1;

  const test = (
    check: IndexableJsonValue | IndexableJsonValue[],
  ): IndexableJsonValue | IndexableJsonValue[] | undefined => {
    if (tracker === len - 1) return check;

    if (Array.isArray(check)) {
      return test(check[path[++tracker] as number]);
    } else {
      const n = check[path[++tracker] as string];

      if (Array.isArray(n)) {
        return test(n as IndexableJsonValue[]);
      } else if (n && typeof n === 'object') {
        return test(n);
      }
    }

    return;
  };

  if (val && typeof val === 'object') {
    return test(val);
  }

  return;
}
