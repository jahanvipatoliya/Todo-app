import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import "./css/table.css";
import { connect } from "react-redux";
import { deleteItem, editItem, updateItem } from "../Services/Actions/action";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

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
  const [val, setValue] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setUserList(props.item.item);
  }, [props.item]);
  // const rows = props.item.item;
  const handleChange = (event) => {
    setValue(event.target.value);

    var sortedProducts = [...userList];
    sortedProducts.sort((a, b) => {
      if (a[event.target.value] < b[event.target.value]) {
        return -1;
      }
      if (a[event.target.value] > b[event.target.value]) {
        return 1;
      }
      return 0;
    });
    setUserList(sortedProducts);
  };
  return (
    <>
      <FormControl variant='outlined' className={classes.formControl}>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={val}
          onChange={handleChange}
          label=''>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value='name'>Name</MenuItem>
          <MenuItem value='companyname'>Company Name</MenuItem>
          {/* <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Id</TableCell>
              <TableCell align='center'>Gender</TableCell>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Company Name</TableCell>
              <TableCell align='center'>Date of Creation</TableCell>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Edit</TableCell>
              <TableCell align='center'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((row, index) => (
              <TableRow key={index}>
                <TableCell align='center'>{row.id}</TableCell>
                <TableCell align='center'>{row.gender}</TableCell>
                <TableCell align='center'>{row.name}</TableCell>
                <TableCell align='center'>{row.companyname}</TableCell>
                <TableCell align='center'>{row.DOC}</TableCell>
                <TableCell align='center'>{row.DOB}</TableCell>
                <TableCell align='center'>
                  <Button
                    color='primary'
                    variant='contained'
                    onClick={() => props.editFormData(row)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell align='center'>
                  <Button
                    color='secondary'
                    variant='contained'
                    onClick={() => props.deleteItem(row)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
