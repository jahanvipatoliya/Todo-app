import React, { useState } from "react";
import { MenuItem, makeStyles, Drawer, FormControl, Select, Button, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import TableToDoList from "./tableFunCompo";
import "./styles/form.scss";
import { connect } from "react-redux";
import { addtoTable, editItem } from "../Services/Actions/action";
import closeIcon from '../assets/images/close.svg'

const useStyle = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ToDoListFunCompo = (props) => {
  const classes = useStyle();
  const [list, setList] = useState([]);
  const [input, setInput] = useState({ category: 'category1' });
  const [count, setCount] = useState(1);
  const [errors, setErrors] = useState({});
  const [submitBtn, setSubmitBtn] = useState(true);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [categoryList, setCategoryList] = useState(
    [
      { color: 'red', value: 'category1' },
      { color: 'green', value: 'category2' },
      { color: 'yellow', value: 'category3' },
      { color: 'gray', value: 'category4' },
      { color: 'blue', value: 'category5' }
    ]
  );

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    var inputVal = input;
    inputVal = {
      id: count,
      productname: input.productname,
      category: input.category
    };
    const flagData = isValidate();
    if (flagData) {
      list.push(inputVal);
      props.addtoTable(inputVal);
      setCount((prevCount) => {
        return prevCount + 1;
      });
      setInput({
        id: "",
        productname: "",
        category: ""
      });
    }
  };
  //error validation
  const isValidate = () => {
    var val = input;
    let errors = {};
    let flag = true;

    if (!val.productname) {
      errors.productname = "Product Name is required";
      flag = false;
    }
    if (!val.category) {
      errors.category = "category is required";
      flag = false;
    }
    setErrors(errors);
    return flag;
  };

  const editFormData = (row) => {
    setInput(row);
    setUpdateBtn(true);
    setSubmitBtn(false);
  };

  const updateItem = (e) => {
    if (isValidate()) {
      let updateList = list.map((updatedUser) => {
        if (updatedUser.id === input.id) {
          updatedUser.productname = input.productname;
          updatedUser.category = input.category
        }
        return updatedUser;
      });
      setInput({
        id: "",
        productname: "",
        category: ""
      });
      setList(updateList);
      setUpdateBtn(false);
      setSubmitBtn(true);
    }
  };
  const toggleDrawer = () => setPopoverOpen(!popoverOpen);

  return (
    <React.Fragment>
      <div>
        <Drawer width={400} openSecondary={true} open={popoverOpen} anchor='right'>
          <div className="modal-header">
            <h4>Form</h4>
            <img src={closeIcon} alt="close" onClick={toggleDrawer} />
          </div>
          <div className='container_form'>
            <form className={classes.root} onSubmit={(e) => SubmitHandler(e)}>
              <br />
              <FormControl variant='outlined' className={classes.formControl}>
                <TextField
                  id='outlined-name'
                  label='Product Name'
                  name='productname'
                  variant='outlined'
                  value={input?.productname}
                  onChange={(e) => changeHandler(e)}
                />
                <div>
                  {errors.productname ? (
                    <Alert severity='error'>{errors.productname}</Alert>
                  ) : null}
                </div>
                <br />
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  onChange={(e) => changeHandler(e)}
                  name='category'
                  label='Category'
                  value={input?.category}
                >
                  {categoryList.map(item => (
                    <MenuItem name={item?.value} value={item?.value}>
                      {item?.value}
                    </MenuItem>
                  ))}
                </Select>
                {console.log('errors', errors)}
                <div>
                  {errors.gender ? (
                    <Alert severity='error'>{errors.category}</Alert>
                  ) : null}
                </div>
                <br />
                <div>
                  <Button variant='contained' onClick={toggleDrawer}>
                    Cancel
                  </Button>
                  {submitBtn ? (
                    <Button type='submit' variant='contained' color='primary'>
                      Save
                    </Button>
                  ) : null}
                  {updateBtn ? (
                    <Button
                      onClick={updateItem}
                      variant='contained'
                      color='primary'>
                      Update
                    </Button>
                  ) : null}
                </div>
              </FormControl>
            </form>
          </div>
          <br />
        </Drawer>
        <TableToDoList categoryList={categoryList} editFormData={editFormData} toggleDrawer={toggleDrawer} toggleDrawer={toggleDrawer} />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.Todos,
    item: state.Todos,
    selectedData: state.EditTodos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addtoTable: (data) => dispatch(addtoTable(data)),
    editItem: (data) => dispatch(editItem(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ToDoListFunCompo);
