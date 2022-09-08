import * as Yup from 'yup';

export const AuthSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, '* username name should include 2 or more characters')
        .max(50, '* username name too long')
        .required('* username name is required'),
    password: Yup.string()
        .min(2, '* password should include 2 or more characters')
        .max(50, '* password too long')
        .required('* password is required'),
});