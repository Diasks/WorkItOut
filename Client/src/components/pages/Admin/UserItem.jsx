import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../../../store";
import { getUser } from "../../../_actions/userAction";
import { deleteUser } from "../../../_actions/userAction";
import { updateUser } from "../../../_actions/userAction";
import Spinner from "../../layout/Spinner";
import { useForm } from "react-hook-form";

export const UserItem = props => {
  let user = props.user;
  let userId = props.match.params.id;

  useEffect(() => {
    store.dispatch(getUser(userId));
  }, []);

  const { handleSubmit } = useForm();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    admin: false,
  });

  const { firstname, lastname, email, admin } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    props.updateUser({ userId, firstname, lastname, email, admin });
  };

  if (props.successful === true) {
    return <Redirect to="/users" />;
  }

  return (
    <main className="main column">
      <div className="login-wrapper">
        <section>
          {user == null ? (
            <Spinner />
          ) : (
            <div>
              <h3>
                {user.firstname} {user.lastname}
              </h3>

              <form
                className="form-container"
                onSubmit={handleSubmit(e => onSubmit(e))}
                noValidate
              >
                <input
                  className="input"
                  type="text"
                  name="firstname"
                  placeholder="Förnamn"
                  value={firstname}
                  onChange={e => onChange(e)}
                />

                <input
                  className="input"
                  type="text"
                  name="lastname"
                  placeholder="Efternamn"
                  value={lastname}
                  onChange={e => onChange(e)}
                />

                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="E-post"
                  value={email}
                  onChange={e => onChange(e)}
                />

                <div>
                  Admin?{" "}
                  <input
                    type="checkbox"
                    name="admin"
                    value={admin}
                    onChange={e =>
                      onChange({
                        target: {
                          name: e.target.name,
                          value: e.target.checked,
                        },
                      })
                    }
                  />
                </div>

                <button className="btn btn-sky" type="submit">
                  Spara
                </button>
              </form>

              <button
                className="btn btn-sky"
                onClick={() => store.dispatch(deleteUser(user._id))}
              >
                Radera
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

UserItem.propTypes = {
  getUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.selectedUser,
  successful: state.user.successful,
});

export default connect(mapStateToProps, { getUser, deleteUser, updateUser })(
  UserItem
);
