import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'; //pomaga zrobic formularze itp
import * as Yup from 'yup'; //do pola wpisywania, np ze trzeba miedzy 3 a 8 znakow itp
import axios from "axios";
import { useHistory } from "react-router-dom";

function CreatePost() {
    const initalValues = {
        title: "",
        postText: "",
        username: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a Title!"),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required() //musi byc string miedzy 3 a 64 znaki i jest wymagane
    });

    let history = useHistory();

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
            history.push("/");
        });
    };


    return <div className="createPostPage">
        <Formik
            initialValues={ initalValues }
            onSubmit={ onSubmit }
            validationSchema={ validationSchema }
        >
            <Form className="formContainer">
                <label>Title:</label>
                <ErrorMessage name="title" component={"span"}></ErrorMessage>
                <Field
                    autocomplete="off" //autowypelnianie w przegladarce wylacza
                    id="inputCreatePost"
                    name="title"
                    placeholder="(Example title)"></Field>
                <label>Post:</label>
                <ErrorMessage name="postText" component={"span"}></ErrorMessage>
                <Field
                    autocomplete="off"
                    id="inputCreatePost"
                    name="postText"
                    placeholder="(Example post text)"></Field>
                <label>Username:</label>
                <ErrorMessage name="username" component={"span"}></ErrorMessage>
                <Field
                    autocomplete="off"
                    id="inputCreatePost"
                    name="username"
                    placeholder="(Example username)"></Field>
                <button type="submit">Create post</button>
            </Form>
        </Formik>
    </div>
}

export default CreatePost;