import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import TableToDoList from "./tableFunCompo";
import "./css/form.css";
import { connect } from "react-redux";
import { addtoTable, editItem } from "../Services/Actions/action";
import moment from "moment";

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
  const [input, setInput] = useState({});
  const [count, setCount] = useState(1);
  const [errors, setErrors] = useState({});
  const [submitBtn, setSubmitBtn] = useState(true);
  const [updateBtn, setUpdateBtn] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    var inputVal = input;

    inputVal = {
      id: count,
      gender: input.gender,
      name: input.name,
      companyname: input.companyname,
      DOB: input.DOB,
      DOC: input.DOC,
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
        gender: "",
        name: "",
        companyname: "",
        DOB: "",
        DOC: "",
      });
    }
  };

  //error validation
  const isValidate = () => {
    var val = input;
    let errors = {};
    let flag = true;

    if (!val.gender) {
      errors.gender = "gender is required";
      flag = false;
    }

    if (!val.name) {
      errors.name = "name is required";
      flag = false;
    }
    if (!val.companyname) {
      errors.companyname = "company name is required";
      flag = false;
    }
    if (!val.DOB) {
      errors.DOB = "date of birth is required";
      flag = false;
    }
    if (!val.DOC) {
      errors.DOC = "date of creation is required";
      flag = false;
    }

    setErrors(errors);
    return flag;
  };

  const editFormData = (row) => {
    // props.editItem(row);
    // console.log("selected data", props.selectedData);
    setInput(row);
    setUpdateBtn(true);
    setSubmitBtn(false);
  };

  // const updaterowItem = () => {
  //   console.log("updated");
  // };

  const updateItem = (e) => {
    if (isValidate()) {
      let updateList = list.map((updatedUser) => {
        if (updatedUser.id === input.id) {
          updatedUser.gender = input.gender;
          updatedUser.name = input.name;
          updatedUser.companyname = input.companyname;
          updatedUser.DOB = input.DOB;
          updatedUser.DOC = input.DOC;
        }
        return updatedUser;
      });
      setInput({
        id: "",
        gender: "",
        name: "",
        companyname: "",
        DOB: "",
        DOC: "",
      });
      setList(updateList);
      setUpdateBtn(false);
      setSubmitBtn(true);
    }
  };
  return (
    <React.Fragment>
      <div>
        <div className='container_form'>
          <form className={classes.root} onSubmit={(e) => SubmitHandler(e)}>
            <br />
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='demo-simple-select-outlined-label'>
                Gender
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                onChange={(e) => changeHandler(e)}
                name='gender'
                label='Gender'>
                <MenuItem name='Male' value='Male'>
                  Male
                </MenuItem>
                <MenuItem name='Female' value='Female'>
                  Female
                </MenuItem>
                <MenuItem name='Other' value='Other'>
                  Other
                </MenuItem>
              </Select>
              <div>
                {errors.gender ? (
                  <Alert severity='error'>{errors.gender}</Alert>
                ) : null}
              </div>
              <br />
              <TextField
                id='outlined-name'
                label='Name'
                name='name'
                variant='outlined'
                value={input?.name}
                onChange={(e) => changeHandler(e)}
              />
              <div>
                {errors.name ? (
                  <Alert severity='error'>{errors.name}</Alert>
                ) : null}
              </div>
              <br />
              <TextField
                id='outlined-name'
                label='Company Name'
                name='companyname'
                variant='outlined'
                value={input?.companyname}
                onChange={(e) => changeHandler(e)}
              />
              <div>
                {errors.companyname ? (
                  <Alert severity='error'>{errors.companyname}</Alert>
                ) : null}
              </div>
              <br />
              <TextField
                id='outlined-name'
                label='Date of Creation'
                name='DOC'
                variant='outlined'
                value={input?.DOC}
                defaultValue={moment(new Date()).format("YYYY-MM-DD")}
                onChange={(e) => changeHandler(e)}
                type='date'
              />
              <div>
                {errors.DOC ? (
                  <Alert severity='error'>{errors.DOC}</Alert>
                ) : null}
              </div>
              <br />
              <TextField
                id='outlined-name'
                label='Date of birth'
                name='DOB'
                variant='outlined'
                defaultValue={moment(new Date()).format("YYYY-MM-DD")}
                value={input?.DOB}
                onChange={(e) => changeHandler(e)}
                type='date'
              />
              <div>
                {errors.DOB ? (
                  <Alert severity='error'>{errors.DOB}</Alert>
                ) : null}
              </div>
              <br />
              {submitBtn ? (
                <Button type='submit' variant='contained' color='primary'>
                  Submit
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
            </FormControl>
          </form>
        </div>
        <br />
        <TableToDoList editFormData={editFormData} />
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
