import * as Yup from 'yup';

export const AuthSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, '* username should include 2 or more characters')
        .max(50, '* username too long')
        .required('* username is required'),
    password: Yup.string()
        .min(2, '* password should include 2 or more characters')
        .required('* password is required'),
});