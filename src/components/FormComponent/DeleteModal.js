import React from 'react';
import { Button, Dialog, useTheme, DialogActions, DialogContent, DialogContentText, useMediaQuery } from '@material-ui/core';
import deleteIcon from '../../assets/images/trash.png'
import "../styles/table.scss";

export default function DeleteModal(props) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            <div className="text-center pb-15">
              <img src={deleteIcon} alt="delete" />
            </div>
            Are you sure you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { props.handleClose(); props.deleteItem() }} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}