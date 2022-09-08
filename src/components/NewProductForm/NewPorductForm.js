import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { uploadSingleFile } from '../../api/uploadFile';


const NewProductForm = () => {

    const [state, setState] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('image', state)
        try {
            const x = await uploadSingleFile(data)
            console.log(x)
        } catch (err) {
            console.log(err)
        }

    }

    return <form action='/upload' encType='multipart/form-data'>

        <TextField label='name' />
        <TextField label='description' />
        <TextField label='name' />
        <Button
            variant="contained"
            component="label"
            name='image'
        >
            Upload File
            <input
                type="file"
                name='image'
                onChange={(e) => setState(e.target.files[0])}
                hidden
            />
        </Button>
        <button onClick={handleSubmit}>SUBMIT</button>
    </form>

}

export default NewProductForm