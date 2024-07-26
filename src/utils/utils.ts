import * as validator from "validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function signupValidation(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  passConfirm: string
): boolean {
  let validate = true;
  if (!email) {
    toastWarning("ایمیل خود را وارد کنید");
    validate = false;
  } else if (!validator.isEmail(email)) {
    toastWarning("ایمیل خود را به درستی وارد کنید");
    validate = false;
  }
  if (!password) {
    toastWarning("رمز عبور خود را وارد کنید");
    validate = false;
  } else if (password.length > 50) {
    toastWarning("رمز عبور انتخابی بیش از حد بزرگ است");
    validate = false;
  } else if (password.length < 8) {
    toastWarning("رمز عبور انتخابی بیش از حد کوچک است");
    validate = false;
  }
  if (!passConfirm) {
    toastWarning("بخش تکرار رمز عبور را تکمیل کنید");
    validate = false;
  } else if (password !== passConfirm) {
    toastWarning("رمز های عبور تطابق ندارند");
    validate = false;
  }
  if (!firstName) {
    toastWarning("نام خود را وارد کنید");
    validate = false;
  } else if (firstName.length > 25) {
    toastWarning("نام وارد شده بزرگ تر از حد مجاز است");
    validate = false;
  } else if (firstName.length < 3) {
    toastWarning("نام وارد شده کوچک تر از حد مجاز است");
    validate = false;
  }
  if (!lastName) {
    toastWarning("نام خانوادگی خود را وارد کنید");
    validate = false;
  }

  return validate;
}

export function signinValidation(email: string, password: string): boolean {
  let validate = true;
  if (!email) {
    toastWarning("ایمیل خود را وارد کنید");
    validate = false;
  } else if (!validator.isEmail(email)) {
    toastWarning("ایمیل خود را به درستی وارد کنید");
    validate = false;
  }

  if (!password) {
    toastWarning("رمز عبور خود را وارد کنید");
    validate = false;
  } else if (password.length > 50) {
    toastWarning("رمز عبور انتخابی بیش از حد بزرگ است");
    validate = false;
  } else if (password.length < 8) {
    toastWarning("رمز عبور انتخابی بیش از حد کوچک است");
    validate = false;
  }

  return validate;
}

export const toastWarning = (warning: string) => {
  toast.warning(warning);
};

// export const newPostValidation = ({}) : boolean =>{

// }
