
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import './searchBox.scss'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../../redux/actions';

const SearchBox = () => {
    const [searchInput, setSearchInput] = useState("")


    const dispatch = useDispatch()

    const handleSearchClick = () => {
        dispatch(setSearch(searchInput))
        setSearchInput("")
    }


    return <>
        <TextField
            variant="outlined"
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