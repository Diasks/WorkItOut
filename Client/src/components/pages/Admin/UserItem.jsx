import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../../../store";
import { getUser } from "../../../_actions/userAction";
import { deleteUser } from "../../../_actions/userAction";
import { updateUser } from "../../../_actions/userAction";
import { useForm } from "react-hook-form";
import Collapse from "@material-ui/core/Collapse";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import GoBackButton from "../../layout/GoBackButton";

export const UserItem = (props) => {
  let user = props.user;
  let userId = props.match.params.id;

  useEffect(() => {
    store.dispatch(getUser(userId));
    // eslint-disable-next-line
  }, []);

  const [expanded, setExpanded] = useState(false);
   /**
   * Metod som används för att hantera ett toggle-onClick-event
   *
   * @param {*} e Det event som gjorde att denna funktion anropades
   */
  const handleExpandClick = (e) => setExpanded(!expanded);

  const { handleSubmit } = useForm();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    admin: false,
  });

  const { firstname, lastname, email, admin } = formData;
    /**
   * Metod som används för att hantera när värdet av ett element har ändrats
   *
   * @param {*} e Det event som gjorde att denna callback anropades
   */
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
   /**
   * Metod som används för att hantera när formuläret skickas
   *
   * @param {*} e Det event som gjorde att denna funktion anropades
   */
  const onSubmit = async (e) => {
    props.updateUser({ userId, firstname, lastname, email, admin });
  };

  if (props.successful === true) {
    return <Redirect to="/users" />;
  }

  const displayUserItem = (
    <LoadingOverlay
      active={props.loading}
      spinner={<PulseLoader color={"#f5af61"} />}
      styles={{
        overlay: (base) => ({
          ...base,
          background: "#efeeee",
        }),
      }}
    >
      <main className="main column no-margin">
        <section>
          {user && (
            <div className="form-container">
              <div className="heading no-margin">
                <div className="link-view-more">
                  <h2 className="heading rose no-margin">
                    {user.firstname} {user.lastname}
                  </h2>
                  <button
                    className="btn btn-toggle"
                    onClick={handleExpandClick}
                  >
                    <span className="icon icon-view-more"></span>
                  </button>
                </div>
                <Collapse in={expanded}>
                  <button
                    className="btn btn-sky"
                    onClick={() => store.dispatch(deleteUser(user._id))}
                  >
                    Radera
                  </button>
                </Collapse>
              </div>

              <form
                className="form-container"
                onSubmit={handleSubmit((e) => onSubmit(e))}
                noValidate
              >
                <input
                  className="input"
                  type="text"
                  name="firstname"
                  placeholder="Förnamn"
                  value={firstname}
                  onChange={(e) => onChange(e)}
                />

                <input
                  className="input"
                  type="text"
                  name="lastname"
                  placeholder="Efternamn"
                  value={lastname}
                  onChange={(e) => onChange(e)}
                />

                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="E-post"
                  value={email}
                  onChange={(e) => onChange(e)}
                />

                <div className="form-section left">
                  <div>
                    <input
                      className="input-checkbox-switch switch"
                      type="checkbox"
                      name="admin"
                      value={admin}
                      defaultChecked={user.admin}
                      onChange={(e) =>
                        onChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked,
                          },
                        })
                      }
                    />
                    <label className="form-label">Admin?</label>
                  </div>
                </div>

                <button className="btn btn-mustard" type="submit">
                  Spara
                </button>
              </form>
              <GoBackButton/>
            </div>
          )}
        </section>
      </main>
    </LoadingOverlay>
  );

  const redirectUser = <Redirect to="/overview" />;

  return (
    <main className="main column">
      {props.auth.admin === true || props.auth.admin === "true"
        ? displayUserItem
        : redirectUser}
    </main>
  );
};

UserItem.propTypes = {
  getUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  successful: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user.selectedUser,
  successful: state.user.successful,
  loading: state.user.loading,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUser, deleteUser, updateUser })(
  UserItem
);
