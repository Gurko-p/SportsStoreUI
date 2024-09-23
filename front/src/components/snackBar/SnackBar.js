import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackBarComponent = ({ open, message, severity }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} >
            <Alert severity={severity} sx={{ width: '250px', minHeigth: '200px' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackBarComponent;