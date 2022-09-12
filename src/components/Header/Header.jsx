import './header.scss'
import Logo from '../../assets/logo.png'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox/SearchBox';


const Header = () => {
    const user = useSelector(data => data.user)
    const navigate = useNavigate()

    return <header className='header'>
        <img src={Logo} alt='logo' />
        {
            user && <SearchBox />
        }

        {user && user.role === 'admin' &&
            <Button variant='contained' onClick={() => navigate('/admin')}>
                Admin Dashboard</Button>
        }

    </header>
}


export default Header