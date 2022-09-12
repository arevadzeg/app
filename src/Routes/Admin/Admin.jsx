
import { Button, Modal, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import NewProductForm from '../../components/NewProductForm/NewPorductForm'
import './admin.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { deleteProduct, getAllProducts } from '../../api/uploadFile';
import { useState } from 'react';
import useAlert from '../../hooks/useAlert';
import { useDispatch } from 'react-redux'
import { setGlobalModal } from '../../redux/actions';

const Admin = () => {

    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [modalOpen, setModalOpen] = useState(false)
    const [productToEdit, setProductToEdit] = useState()
    const { fireAlert, Alert } = useAlert()
    const dispatch = useDispatch()


    const handleGetAllProducts = async () => {
        const products = await getAllProducts(page)
        setProducts(products.data.products)
        setTotalPages(products.data.pages)
    }



    const handleDeleteProduct = (data) => {
        deleteProduct(data.id).then((res) => {
            setProducts(prev => {
                return prev.filter((item) => item._id !== data.id)
            })
        }).catch((err) => console.log(err))
    }

    const deleteButtonClick = (id) => {
        dispatch(setGlobalModal({ id }))
        fireAlert("", "Are you sure you want to delete this item", handleDeleteProduct)
    }

    useEffect(() => {
        handleGetAllProducts()
    }, [page])

    const handleEditProduct = (id) => {
        setProductToEdit(products.filter((product) => product._id === id)[0])
        setModalOpen('edit')
    }

    console.log(products)

    return <div className='admin'>
        <div className='admin_header'>
            <h2>
                Welcome to <strong>Admin</strong> dashboard
            </h2>

            <Button className='button' variant='contained' onClick={() => setModalOpen('new')}>
                Add new product
            </Button>
        </div>
        <TableContainer component={Paper}>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell >Price</TableCell>
                        <TableCell className='table_id'>id</TableCell>
                        <TableCell >Edit</TableCell>
                        <TableCell >Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products && products.map((product, i) => (
                        <TableRow key={i}>
                            <TableCell component="th" scope="row">
                                {product.name}
                            </TableCell>
                            <TableCell >{product.onGoingPrice}</TableCell>
                            <TableCell className='table_id'>{product._id}</TableCell>
                            <TableCell >
                                <Button className='edit-button' onClick={() => handleEditProduct(product._id)} variant='outlined' startIcon={<EditIcon />}>
                                    Edit
                                </Button></TableCell>
                            <TableCell >
                                <Button className='delete-button' onClick={() => { deleteButtonClick(product._id) }} variant='outlined' startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Modal open={Boolean(modalOpen)} onClose={() => setModalOpen(false)}>
            <div className='product_modal center'>
                <NewProductForm
                    formMode={modalOpen}
                    setProducts={setProducts}
                    setProductToEdit={setProductToEdit}
                    productToEdit={modalOpen === 'edit' ? productToEdit : null} />
            </div>
        </Modal>
        {Alert}
        <Pagination count={totalPages} variant="outlined" className='pagination' onChange={(e) => setPage(e.target.textContent)} />

    </div>
}

export default Admin