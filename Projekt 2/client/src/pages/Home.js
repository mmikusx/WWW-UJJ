import React from "react";
import axios from "axios"; //Prostsze od fetcha, pozwala łatwo GET()
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Home() {

    // wyswietl na stronie
    const [listOfPosts, setListOfPosts] = useState([]);

    // changing route
    let history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {
            setListOfPosts(response.data)
        });
    }, []);

    return (
        <div>
            {listOfPosts.map((value, key) => {
                return (
                    <div className="post" onClick={() => {
                        history.push(`/post/${value.id}`)
                    }}>
                        <div className="title"> {value.title} </div>
                        <div className="body"> {value.postText} </div>
                        <div className="username"> {value.username} </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Home;