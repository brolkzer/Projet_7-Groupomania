import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture, getUser } from "../actions/user.actions";

const UploadImage = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("id", userData.id);
    dispatch(uploadPicture(data, userData.id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
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
