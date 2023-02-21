import React, {useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'; //pomaga zrobic formularze itp
import * as Yup from 'yup'; //do pola wpisywania, np ze trzeba miedzy 3 a 8 znakow itp
import axios from "axios";
import { useHistory } from "react-router-dom";

function CreatePost() {

    const initalValues = {
        title: "",
        postText: "",
        author: "",
        bookCondition: "",
        writtenInYear: "",
        bookCover: "",
        delivery: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Musisz wprowadzic tytuł książki!"),
        postText: Yup.string().required("Musisz wprowadzić opis książki!"), //musi byc string
        author: Yup.string().required("Musisz wprowadzić autora książki!"),
        bookCondition: Yup.string().required("Musisz wprowadzić w jakim stanie jest książka!"),
        writtenInYear: Yup.string().required("Musisz wprowadzić w którym roku została wydana książka!").matches(/^[0-9]+$/, "Możesz podać tylko liczbe")
            .min(4, 'Wprowadź poprawny rok')
            .max(4, 'Wprowadź poprawny'),
        bookCover: Yup.string().required("Musisz wybrać w jakiej okładce jest książka!"),
        delivery: Yup.string().required("Wybierz sposób przekazania książki!"),
    });

    let history = useHistory();

    useEffect( () => {
        if (!localStorage.getItem("accessToken")) {
            alert("Aby dodac recenzje zaloguj sie!");
            history.push("/login");
        }
        // eslint-disable-next-line
    }, []);

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data, {
            headers: { accessToken: localStorage.getItem("accessToken")},
        }).then(() => {
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
                <label>Tytuł:</label>
                <ErrorMessage name="title" component={"span"}></ErrorMessage>
                <Field
                    autocomplete="off" //autowypelnianie w przegladarce wylacza
                    id="inputCreatePost"
                    name="title"
                    placeholder="Wprowadź tytuł książki..."></Field>
                <label>Opis książki:</label>
                <ErrorMessage name="postText" component={"span"}></ErrorMessage>
                <Field
                    autocomplete="off"
                    id="inputCreatePost"
                    name="postText"
                    placeholder="Wprowadź opis książki..."></Field>
                <label>Autor książki:</label>
                <ErrorMessage name="author" component={"span"}></ErrorMessage>
                <Field
                    autocomplete="off"
                    id="inputCreatePost"
                    name="author"
                    placeholder="Wprowadź autora książki..."></Field>
                <label>Stan książki:</label>
                <ErrorMessage name="bookCondition" component={"span"}></ErrorMessage>
                <Field
                    autocomplete="off"
                    id="inputCreatePost"
                    name="bookCondition"
                    as="select"
                >
                    <option>Wybierz stan książki...</option>
                    <option value="widoczne slady używania">Widoczne slady uzywania</option>
                    <option value="dobry">Dobry</option>
                    <option value="bardzo dobry">Bardzo dobry</option>
                    <option value="idealny, książka jak nowa">Idealny, książka jak nowa</option>
                </Field>

                <label>Rok wydania książki:</label>
                <ErrorMessage name="writtenInYear" component={"span"}></ErrorMessage>
                <Field
                    autocomplete="off"
                    id="inputCreatePost"
                    name="writtenInYear"
                    placeholder="Wprowadź rok wydania..."></Field>
                <label>Rodzaj okładki:</label>
                <ErrorMessage name="bookCover" component={"span"}></ErrorMessage>
                <Field
                    autocomplete="off"
                    id="inputCreatePost"
                    name="bookCover"
                    as="select"
                >
                    <option>Wybierz rodzaj okładki...</option>
                    <option value="okładka miękka">Okładka miękka</option>
                    <option value="okładka twarda">Okładka twarda</option>
                </Field>
                <label>Sposób przekazania książki:</label>
                <ErrorMessage name="delivery" component={"span"}></ErrorMessage>
                <Field
                    autocomplete="off"
                    id="inputCreatePost"
                    name="delivery"
                    as="select"
                >
                    <option>Wybierz sposób przekazania...</option>
                    <option value="odbiór osobisty">Odbiór osobisty</option>
                    <option value="wysyłka">Wysyłka</option>
                </Field>
                <button type="submit">Create post</button>
            </Form>
        </Formik>
    </div>
}

export default CreatePost;