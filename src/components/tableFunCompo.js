import React, { useEffect, useState } from "react";
import { makeStyles, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import "./styles/table.scss";
import { connect } from "react-redux";
import { deleteItem, editItem, updateItem } from "../Services/Actions/action";
import DeleteModal from './FormComponent/DeleteModal';
import editIcon from '../assets/images/edit.svg';
import deleteIcon from '../assets/images/delete.svg';
import plusIcon from '../assets/images/plus-white.svg';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const TableToDoList = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [userList, setUserList] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setUserList(props.item.item);
  }, [props.item]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    history.push('/login')
    sessionStorage.removeItem('isLogin', false);
  }

  return (
    <>
      <div className="headWrapper">
        <div>
          <h3>{`${userList.length} Products`}</h3>
        </div>
        <div className="d-flex">
          <div style={{ background: "#007AFF" }} className="btn-primary" onClick={props.toggleDrawer}>
            <img src={plusIcon} alt="add icon" />
          </div>
          <Button type='submit' variant='contained' color='primary' onClick={(e) => handleClick(e)} >
            Logout
          </Button>
        </div>
      </div>

      <div >
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Index</TableCell>
                <TableCell align='center'>Product Name</TableCell>
                <TableCell align='center'>Category</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((row, index) => {
                var backColor = props.categoryList.find(item => row.category === item.value)
                return (<>
                  <TableRow key={index} style={{ backgroundColor: backColor?.color }}>
                    <TableCell align='center'>{row.id}</TableCell>
                    <TableCell align='center'>{row.productname}</TableCell>
                    <TableCell align='center'>
                      {row.category}
                    </TableCell>
                    <TableCell align='center'>
                      <img
                        style={{ paddingRight: '10px' }}
                        src={editIcon} alt="edit"
                        onClick={() => { props.toggleDrawer(); props.editFormData(row) }}
                      />
                      <img src={deleteIcon} alt="delete" onClick={handleClickOpen} />
                    </TableCell>
                  </TableRow>
                  <DeleteModal open={open} handleClose={handleClose} deleteItem={() => props.deleteItem(row)} />
                </>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    item: state.Todos,
    selectedData: state.EditTodos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (data) => dispatch(deleteItem(data)),
    editItem: (data) => dispatch(editItem(data)),
    updateItem: (data) => dispatch(updateItem(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableToDoList);
