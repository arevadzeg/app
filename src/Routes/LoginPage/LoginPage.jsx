import './loginPage.scss'
import { TextField, Button } from '@mui/material';


const LoginPage = () => {

    return <div className="login_page">

        <h1>
            Welcome to Scopic Auction please login in to get started
        </h1>

        <form className="login_form center">

            <TextField variant="standard" label='Username' />
            <TextField variant="standard" label='Password' />

            <Button variant='contained'>
                Login
            </Button>

        </form>
    </div>

}

export default LoginPage