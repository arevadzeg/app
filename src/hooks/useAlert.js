import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"


const useAlert = () => {

    const [open, setOpen] = useState(false)
    const [alertData, setAlertData] = useState({
        title: "",
        message: "",
        onSubmit: () => { },
    })
    const { globalModal } = useSelector((data) => data)


    const fireAlert = (title, message, onSubmit) => {
        setAlertData({ title, message, onSubmit })
        setOpen(true)
    }
    const handleConfirm = () => {
        alertData.onSubmit(globalModal)
        setOpen(false)
    }


    const Alert = useMemo(() => {

        return <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle >
                {alertData.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {alertData.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleConfirm} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    }, [open, alertData])


    return {
        fireAlert,
        Alert
    }

}

export default useAlert