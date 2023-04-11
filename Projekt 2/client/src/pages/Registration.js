import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";


function Registration() {
    const initialValues = {
        username: "",
        password: "",
    };

    let history = useHistory();

    //requirements in formik schema
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("Musisz podać nazwę użytkownika!"),
        password: Yup.string().min(4).max(20).required("Musisz podać hasło!"),
    });

    //create account and move to login page
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(() => {
            console.log(data);
            history.push("/login");
        });
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="loginContainer">
                    <label>Nazwa użytkownika: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        autoComplete="off"
                        // id="inputCreatePost"
                        name="username"
                        placeholder="Wpisz nazwe użytkownika..."
                    />

                    <label>Hasło: </label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                        autoComplete="off"
                        type="password"
                        // id="inputCreatePost"
                        name="password"
                        placeholder="Wpisz hasło..."
                    />

                    <button type="submit">Zarejestruj</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Registration;