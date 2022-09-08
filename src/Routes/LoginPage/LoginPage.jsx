import './loginPage.scss'
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import { AuthSchema } from '../../validationSchemas/AuthSchema';
import { login } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions';


const LoginPage = () => {

    const [error, setError] = useState(null)


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: (values) => {
            login(values).then((res) => {
                localStorage.setItem('access_token', res.data.access_token)
                localStorage.setItem('user_info', JSON.stringify(res.data.userInfo))
                dispatch(setUser(res.data.userInfo))
                navigate('/auction')
            }).catch(err => {
                console.log(err)
                setError(err.response.data.msg)
            })
        },
        validationSchema: AuthSchema,
        validateOnBlur: false,
        validateOnChange: false
    })

    return <div className="login_page">

        <h1>
            Welcome to Scopic Auction please login in to get started
        </h1>

        <form className="login_form center">
            {error && <p className='error'>{error}</p>}
            <TextField variant="standard"
                label='Username'
                error={Boolean(formik.errors.username)}
                helperText={formik.errors.username}
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange} />
            <TextField variant="standard" label='Password'
                error={Boolean(formik.errors.password)}
                helperText={formik.errors.password}
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                type='password' />

            <Button variant='contained' onClick={formik.handleSubmit}>
                Login
            </Button>

        </form>
    </div>

}

export default LoginPage