import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../actions/post.actions";
import { isEmpty } from "./Utils";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePicture = async (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    console.log(file);
    setVideo("");
  };
  const paramsId = `${Date.now().toString()}${userData.id}`;
  const imgString = `./assets/postsUploads/${paramsId}.jpg`;

  const handlePost = async () => {
    if (message || postPicture || video) {
      const data = new FormData();
      data.append("posterId", userData.id);
      data.append("message", message);

      if (file) {
        data.append("imgString", imgString);
        data.append("file", file);
      }
      data.append("video", video);

      if (file && file.size > 500000)
        document.getElementById("post-file-error").innerHTML =
          "Le fichier ne doit pas dépasser 500 Ko";
      else {
        await dispatch(addPost(data, paramsId));
        dispatch(getPosts());
        cancelPost();
      }
    } else {
      alert("Veuillez remplir votre post avant de l'envoyer");
    }
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
    document.getElementById("post-file-error").innerHTML = "";
  };

  const handleVideo = () => {
    let findLink = message.split(" ");
    for (let i = 0; i < findLink.length; i++)
      if (
        findLink[i].includes("https://www.youtu") ||
        findLink[i].includes("https://youtu")
      ) {
        let embed = findLink[i].replace("watch?v=", "embed/");
        setVideo(embed.split("&")[0]);
        findLink.splice(i, 1);
        setMessage(findLink.join(" "));
        setPostPicture(null);
      } else if (
        findLink[i].includes("https://www.giphy") ||
        findLink[i].includes("https://giphy")
      ) {
        if (findLink[i].includes("clips")) {
          let clearedEmbed = findLink[i].split("-").reverse()[0];
          let embed = findLink[i].replace("clips/", "embed/");
          let embed0 = embed.split("/")[0];
          let embed1 = embed.split("/")[1];
          let embed2 = embed.split("/")[2];
          let embed3 = embed.split("/")[3];
          let embedLink =
            embed0 + "//" + embed1 + embed2 + "/" + embed3 + "/" + clearedEmbed;
          setVideo(embedLink);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture(null);
        } else if (findLink[i].includes("gifs")) {
          let clearedEmbed = findLink[i].split("-").reverse()[0];
          let embed = findLink[i].replace("gifs/", "embed/");
          let embed0 = embed.split("/")[0];
          let embed1 = embed.split("/")[1];
          let embed2 = embed.split("/")[2];
          let embed3 = embed.split("/")[3];
          let embedLink =
            embed0 + "//" + embed1 + embed2 + "/" + embed3 + "/" + clearedEmbed;
          setVideo(embedLink);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture(null);
        }
      }
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
    handleVideo();
  }, [userData, message, video]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <NavLink exact to="/Profil">
            <div className="user-info">
              <img src={userData.picture} alt="user-pic" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="content"
              id="content"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <p id="post-file-error"></p>
            {postPicture || video.length > 20 ? (
              <li className="card-container">
                <div className="card-right">
                  <div className="card-header"></div>
                  <div className="content">
                    <img src={postPicture} alt="" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow=""
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <label htmlFor="file-upload">
                      <img src="./assets/icons/picture.svg" alt="img-icon" />
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => {
                        handlePicture(e);
                      }}
                    />
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo("")}>Supprimer video</button>
                )}
              </div>
              <div className="btn-send">
                {message || postPicture || video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler l'envoi
                  </button>
                ) : null}

                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
