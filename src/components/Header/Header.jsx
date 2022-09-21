import './header.scss'
import Logo from '../../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox/SearchBox';
import { setUser } from '../../redux/actions';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const Header = () => {
    const user = useSelector(data => data.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogOut = () => {
        localStorage.clear()
        dispatch(setUser(null))
        navigate('/')
    }

    return <header className='header'>
        <img src={Logo} onClick={() => navigate('/auction')} alt='logo' />
        <div className='header_right'>
            {
                user && <SearchBox />
            }
            {user && (user.role === 'admin' ?
                <Button variant='outlined' className='button_white' onClick={() => navigate('/admin')}>
                    Admin Dashboard</Button> :
                <>
                    <Button variant='outlined' className='button_white' onClick={() => navigate('/autobid')}>
                        Configure auto-bid
                    </Button>
                    <Button variant='outlined' startIcon={<AccountBoxIcon />} className='button_white' onClick={() => navigate('/profile')}>
                        Profile
                    </Button>
                </>
            )
            }
            {
                user && <Button variant='outlined' onClick={handleLogOut} className='button_white' >
                    Lot out
                </Button>
            }
        </div>


    </header>
}


export default Header