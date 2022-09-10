import { MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSort } from '../../redux/actions'
import './sort.scss'

const Sort = () => {

    const [sortState, setSortState] = useState('default')

    const dispatch = useDispatch()

    const handleSortChange = (e) => {
        setSortState(e.target.value)
        dispatch(setSort(e.target.value))
    }

    return <>
        <Select
            className='sort'
            value={sortState}
            variant='standard'
            onChange={(e) => handleSortChange(e)}
        >
            <MenuItem value={'default'}>Relevance</MenuItem>
            <MenuItem value={'asc'}>asc by price</MenuItem>
            <MenuItem value={'desc'}>desc by price</MenuItem>
        </Select >
    </>
}

export default Sort