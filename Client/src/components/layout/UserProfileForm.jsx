import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getUserProfile,
  updateUser,
  uploadImage,
} from "../../_actions/userAction";
import { useEffect } from "react";
import store from "../../store";
import { useForm } from "react-hook-form";
import Alert from "../layout/Alert";

const UserProfileForm = ({ selectedUser, updateUser, uploadImage }) => {
  let defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    profilePicture: {},
  };

  const { handleSubmit, reset } = useForm({ defaultValues });
  const [formData, setFormData] = useState("");
  const [profilePicture, setProfilePicture] = useState();

  const { firstname, lastname, email } = formData;
  const userId = selectedUser._id;

  useEffect(() => {
    store.dispatch(getUserProfile());
  }, []);

  const onFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const uploadProfilePicture = (e) => {
    uploadImage({ userId, profilePicture });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    updateUser({ userId, firstname, lastname, email });
    reset();
  };
  return (
    <div>
      <div
        style={{
          border: "1px solid black",
          height: "100px",
          width: "100px",
        }}
      >
        <img
          src={`data:${
            selectedUser.profilePicture !== undefined &&
            selectedUser.profilePicture.contentType
          };base64,${
            selectedUser.profilePicture !== undefined &&
            selectedUser.profilePicture.image
          }`}
          style={{
            height: "100px",
            width: "100px",
          }}
          alt=""
        />
      </div>

      <input
        type="file"
        name="file"
        onChange={(e) => onFileChange(e)}
        defaultValue={defaultValues.image}
      />

      <button onClick={uploadProfilePicture} className="btn btn-mustard">
        Ladda upp
      </button>

      <form
        className="form-container"
        onSubmit={handleSubmit((e) => onSubmit(e))}
      >
        <input
          className="input wide"
          type="text"
          name="firstname"
          placeholder={selectedUser.firstname}
          defaultValue={defaultValues.firstname}
          onChange={(e) => onChange(e)}
        />

        <input
          className="input wide"
          type="text"
          name="lastname"
          placeholder={selectedUser.lastname}
          defaultValue={defaultValues.lastname}
          onChange={(e) => onChange(e)}
        />

        <input
          className="input wide"
          type="email"
          name="email"
          placeholder={selectedUser.email}
          defaultValue={defaultValues.email}
          onChange={(e) => onChange(e)}
        />

        <input
          className="input wide darken"
          placeholder={selectedUser.date}
          disabled
        />

        <button
          className="btn btn-mustard"
          type="submit"
          disabled={!firstname || !lastname || !email}
        >
          Spara
        </button>

        <Alert />
      </form>
    </div>
  );
};

UserProfileForm.propTypes = {
  updateUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedUser: state.user.selectedUser,
});

export default connect(mapStateToProps, {
  getUserProfile,
  updateUser,
  uploadImage,
})(UserProfileForm);
