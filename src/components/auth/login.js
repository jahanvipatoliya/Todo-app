import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { TextField, FormControl, Button } from "@material-ui/core";
import "../styles/form.scss";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from 'react-router-dom';

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

const Login = (props) => {
    const classes = useStyle();
    const history = useHistory();

    const [input, setInput] = useState({});
    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };
    const SubmitHandler = (e) => {
        e.preventDefault();
        const flagData = isValidate();
        if (flagData) {
            history.push('/todo-list')
            sessionStorage.setItem('isLogin', true);
        }
    };
    //error validation
    const isValidate = () => {
        var val = input;
        let errors = {};
        let flag = true;

        if (!val.email) {
            errors.email = "email is required";
            flag = false;
        }
        if (!val.password) {
            errors.password = "password is required";
            flag = false;
        }
        setErrors(errors);
        return flag;
    };

    return (
        <React.Fragment>
            <div style={{ textAlign: 'center' }}>
                <div>
                    <h1>Login</h1>
                </div>
                <div className='container_form'>
                    <form className={classes.root}>
                        <br />
                        <FormControl variant='outlined' className={classes.formControl}>
                            <TextField
                                id='outlined-name'
                                label='Email'
                                name='email'
                                variant='outlined'
                                value={input?.email}
                                onChange={(e) => changeHandler(e)}
                            />
                            <div>
                                {errors.email ? (
                                    <Alert severity='error'>{errors.email}</Alert>
                                ) : null}
                            </div>
                            <br />
                            <TextField
                                id='outlined-name'
                                label='Password'
                                name='password'
                                variant='outlined'
                                value={input?.password}
                                onChange={(e) => changeHandler(e)}
                            />
                            <div>
                                {errors.password ? (
                                    <Alert severity='error'>{errors.password}</Alert>
                                ) : null}
                            </div>
                            <br />
                            <div>
                                <Button type='submit' variant='contained' color='primary' onClick={(e) => SubmitHandler(e)} >
                                    Submit
                                </Button>
                            </div>
                        </FormControl>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};


export default Login
