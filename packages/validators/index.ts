import { ValidatorFn } from "../types/control";

const EMAIL_REGEXP =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const isEmptyInputValue = (value: any) => value == null || value.length === 0;

export const required: ValidatorFn = (value) => (isEmptyInputValue(value) ? { required: true } : null);

export const emailValidator: ValidatorFn = (value) => {
  if (isEmptyInputValue(value)) {
    return null;
  }
  return EMAIL_REGEXP.test(value) ? null : { email: true };
};
