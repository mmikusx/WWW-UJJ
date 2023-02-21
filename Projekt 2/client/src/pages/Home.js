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
        <div className="section3-containers-parent">
            {listOfPosts.map((value) => {
                return (
                    <div className="section3-containers-childs">
                            <h3 className="section3-promo-text">{value.title}</h3>
                            <p>{value.postText}</p>
                            <a href="#/" className="section3-promo-see-more" onClick={() => {
                                history.push(`/post/${value.id}`);
                            }}>Zobacz ogłoszenie</a>
                    </div>
                );
            })}
        </div>
    )
}

export default Home;