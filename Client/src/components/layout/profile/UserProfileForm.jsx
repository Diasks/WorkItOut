import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getUserProfile,
  updateUser,
  uploadImage,
} from "../../../_actions/userAction";
import { useEffect } from "react";
import store from "../../../store";
import { useForm } from "react-hook-form";
import Alert from "../../layout/Alert";
import Moment from "react-moment";

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
    /**
   * Metod som används för att hantera när värdet av ett element har ändrats
   *
   * @param {*} e Det event som gjorde att denna funktion anropades
   */
  const onFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };
    /** 
   * Metod som används när man vill ladda upp en profilbild via ett onClick-event
   *
   * @param {*} e Det event som gjorde att denna funktion anropades
   */
  const uploadProfilePicture = (e) => {
    uploadImage({ userId, profilePicture });
  };
    /**
   * Metod (används som callback) för att hantera när värdet av ett element har ändrats.
   *
   * @param {*} e Det event som gjorde att denna callback anropades
   */
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
   /**
   * Metod som används för att hantera när formuläret skickas.
   *
   * @param {*} e Det event som gjorde att denna funktion anropades
   */
  const onSubmit = (e) => {
    updateUser({ userId, firstname, lastname, email });
    reset();
  };
  return (
    <div>
      <div>
        <img
          src={`data:${
            selectedUser.profilePicture !== undefined &&
            selectedUser.profilePicture.contentType
          };base64,${
            selectedUser.profilePicture !== undefined &&
            selectedUser.profilePicture.image
          }`}
          className="avatar"
          alt=""
        />
      </div>

      <input
        type="file"
        name="file"
        id="btn-avatar"
        onChange={(e) => onFileChange(e)}
        defaultValue={defaultValues.image}
      />

      <label htmlFor="btn-avatar" className="btn btn-plum wide margin">
        Välj fil
      </label>

      <button onClick={uploadProfilePicture} className="btn btn-plum margin">
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

        <Moment className="input input-date wide darken" format="YYYY-MM-DD">
          {selectedUser.date}
        </Moment>

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
