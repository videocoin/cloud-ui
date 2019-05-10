export interface FormField {
  name: string;
  label: string;
  type: string;
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

export interface RestoreForm {
  password: string;
  confirmPassword: string;
  token: string;
}
