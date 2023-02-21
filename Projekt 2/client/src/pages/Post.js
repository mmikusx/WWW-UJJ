import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from 'react-router-dom';
import axios from "axios"; //uzywanie id z mysql
import { AuthContext } from "../helpers/AuthContext";

function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);

    let history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byID/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });
        // eslint-disable-next-line
    }, []);

    const addComment = () => {
      axios.post("http://localhost:3001/comments/", { commentBody: newComment, PostId: id}, { headers: { accessToken: localStorage.getItem("accessToken") } })
          .then((response) => {
              if (response.data.error) {
                  console.log(response.data.error);
              } else {
                  const commentToAdd = {commentBody: newComment, username: response.data.username};
                  setComments([...comments, commentToAdd]);
                  setNewComment("");
              }
      });
    };

    const deleteComment = (id) => {
        axios.delete(`http://localhost:3001/comments/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then(() => {
           setComments(
               comments.filter((val) => {
                    return val.id !== id;
               })
           );
        });
    };

    const deletePost = (id) => {
        axios
            .delete(`http://localhost:3001/posts/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                history.push("/");
            });
    };

    var date = new Date(postObject.createdAt);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var postDate = day + "." + month + "." + year;
    var postHour = hours + ":" + minutes + ":" + seconds;

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="postPostPage" id="individual">
                    <div className="titlePostPage">{postObject.title}</div>
                    <div className="usernameAndDatePostPage">Ogłoszenie dodane przez <b>{postObject.username}</b> dnia {postDate} o godzinie {postHour}</div>
                    <div className="author"><b>Autor/ka książki: </b>
                        {postObject.author}</div>
                    <div className="writtenInYear"><b>Rok wydania książki: </b>
                        {postObject.writtenInYear}</div>
                    <div className="postText"><b>Opis książki: </b>{postObject.postText}</div>
                    <div className="bookCondition"><b>Stan książki: </b>
                        {postObject.bookCondition}</div>
                    <div className="bookCover"><b>Rodzaj okładki: </b>
                        {postObject.bookCover}</div>
                    <div className="delivery"><b>Sposób odbioru książki: </b>
                        {postObject.delivery}</div>
                    <div className="footer">
                        { authState.username === "admin" ? (
                            <button onClick={() => {deletePost(postObject.id)}}>Usuń ogłoszenie</button>
                        ) : authState.username === postObject.username ? (
                            <button onClick={() => {deletePost(postObject.id)}}>Usuń ogłoszenie</button>
                        ) : null }
                    </div>
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input type="text" placeholder="Comment..." autoComplete="off" value={newComment}
                           onChange={(event) => {
                               setNewComment(event.target.value)
                           }}/>
                    <button onClick={addComment}>Add comment!</button>
                </div>
                <div className="listOfComments">
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className="comment">
                                <div>
                                    <div className="usernameAndDatePostPage">
                                        Użytkownik <b>{comment.username}</b> napisał komentarz:
                                    { authState.username === "admin" ? (
                                        <div className="close-container" onClick={() => {deleteComment(comment.id)}}>
                                            <div className="leftright"></div>
                                            <div className="rightleft"></div>
                                        </div>
                                    ) : authState.username === comment.username ? (
                                        <div className="close-container" onClick={() => {deleteComment(comment.id)}}>
                                            <div className="leftright"></div>
                                            <div className="rightleft"></div>
                                        </div>
                                    ) : null }
                                    </div>
                                </div>
                                {comment.commentBody}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post;