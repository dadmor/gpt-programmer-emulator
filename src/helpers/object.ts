
/* 
  get deep by path
*/
export const deepSet = (obj: any, path: string, val: any) => {
    const keys = path.split("."),
      lastKey = keys.pop(),
      lastObj = keys.reduce(
        (obj: any, key: any) => (obj[key] = obj[key] || {}),
        obj
      );
    lastObj[lastKey!] = val;
  };
  
  /* 
      set deep by path
    */
  export const deepGet = (obj: any, path: string) => {
    let e = Array.isArray(path)
        ? path
        : typeof path === "string"
        ? path.split(".")
        : path,
      v,
      i;
    for (v = obj, i = 0; v && i < e.length; ++i) v = v[e[i]];
    return v;
  };
  