/* eslint-disable prefer-arrow/prefer-arrow-functions */

export function isNotEmpty(val: any): boolean {
  return val !== null && val !== undefined;
}

export const removeNull = (formObject: any) => {
  Object.keys(formObject).forEach((key) => {
    if (formObject[key] && typeof formObject[key] === "object") {
      removeNull(formObject[key]);
    } else if (formObject[key] === null) {
      delete formObject[key];
    }
  });

  return formObject;
};
