import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../actions/user.actions";

const UploadImage = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = async (e) => {
    e.preventDefault();
    const imgString = `./assets/profil/${userData.id}.jpg`;
    const data = new FormData();
    if (file) data.append("file", file);
    data.append("imgString", imgString);
    await dispatch(uploadPicture(data, userData.id));
  };

  return (
    <form action="" onSubmit={(e) => handlePicture(e)} className="upload-pic">
      <label htmlFor="file">Changer de photo</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <input type="submit" />
    </form>
  );
};

export default UploadImage;
