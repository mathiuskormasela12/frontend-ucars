/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// ========== Generate Form Data

export const generateFormData = (data: any) => {
  const body = new FormData();
  for (const prop in data) {
    body.append(prop, data[prop]);
  }

  return body;
};
