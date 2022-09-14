
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import './searchBox.scss'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../../redux/actions';
import { useLocation, useNavigate } from "react-router-dom";

const SearchBox = () => {
    const [searchInput, setSearchInput] = useState("")
    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleSearchClick = () => {
        if (location.pathname !== '/auction') {
            navigate('/auction?search=true')
        }
        dispatch(setSearch(searchInput))
    }


    return <>
        <TextField
            variant="outlined"
            className='textField-white'
            placeholder='Search'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon onClick={handleSearchClick} />
                    </InputAdornment>
                ),
            }}
        /></>

}

export default SearchBox