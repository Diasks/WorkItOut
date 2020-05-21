import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";
import store from "../../../store";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { getUserProfile, addActivity } from "../../../_actions/userAction";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";

const Overview = ({ auth: { admin }, selectedUser, loading, addActivity }) => {
  let defaultValues = {
    title: "",
    time: "",
  };

  useEffect(() => {
    store.dispatch(getUserProfile());
  }, []);

  const { handleSubmit, reset } = useForm({ defaultValues });
  const [formData, setFormData] = useState("");
  const { title, time } = formData;
  const userId = selectedUser._id;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    debugger;
    addActivity({ userId, title, time });
    reset();
  };

  const activeChallengeLog = (
    <div>
      <h4>Avklarade pass</h4>
      <p>
        Här kan du se hur många pass som är avklarade i nuvarande och senaste
        utmaning.
      </p>
    </div>
  );

  const noChallengesActive = (
    <div className="block">
      <div>
        <h4 className="heading darkgray">Vill du anta en utmaning?</h4>
        <p className="description-text">
          Titta bland våra utmaningar under länken{" "}
          <span className="bold">anta utmaning</span> så är det bara att sätta
          igång.
        </p>
      </div>
      <div className="faded-text">Inga utmaningar igång</div>
      <div className="icon-wrap">
        <span className="icon icon-running"></span>
      </div>
    </div>
  );

  const displayOverview = (
    <main className="main column less-margin">
      <section className="curved-banner">
        <div className="banner-text">
          <h2 className="heading rose">Hejsan, {selectedUser.firstname}!</h2>
          <p className="label cream">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
          </p>
        </div>

        <div className="curved-banner-bottom"></div>
      </section>
      <section>
        <h4 className="heading darkgray">Har du varit aktiv idag?</h4>
        <p className="description-text">
          Registrera vad du gjort, så sparas det i din historik.
        </p>

        <form
          className="form-container"
          onSubmit={handleSubmit((e) => onSubmit(e))}
        >
          <input
            className="input wide"
            type="text"
            name="title"
            placeholder="Träningspass"
            defaultValue={defaultValues.title}
            onChange={(e) => onChange(e)}
          />

          <input
            className="input wide"
            type="text"
            name="time"
            placeholder="Minuter"
            defaultValue={defaultValues.time}
            onChange={(e) => onChange(e)}
          />

          <button className="btn btn-mustard" type="submit">
            Spara
          </button>
        </form>
      </section>
      <section>
        {selectedUser.userFitnessChallenge === undefined ||
        selectedUser.userFitnessChallenge === null
          ? activeChallengeLog
          : noChallengesActive}
      </section>
    </main>
  );

  const redirectUser = <Redirect to="/dashboard" />;

  return (
    <LoadingOverlay
      active={loading}
      spinner={<PulseLoader color={"#f5af61"} />}
      styles={{
        overlay: (base) => ({
          ...base,
          background: "#efeeee",
        }),
      }}
    >
      {admin === "false" || admin === false ? displayOverview : redirectUser}
    </LoadingOverlay>
  );
};

Overview.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  selectedUser: state.user.selectedUser,
  loading: state.user.loading,
});

export default connect(mapStateToProps, { getUserProfile, addActivity })(
  Overview
);
