import React, { useContext, useState } from "react";
import style from "@/styles/style.module.css";
import { AuthContext } from "@/context/authProvider";
import { registerApiCall } from "@/api/userApis";

const initialState = {
  name: "",
  username: "",
  password: "",
};

const Register = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const { handleLogin } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (form.name.trim().length < 6 || form.name.trim().length > 12) {
      newErrors.name = "Name must be between 6 and 12 characters.";
    }

    if (form.username.trim().length < 6 || form.username.trim().length > 12) {
      newErrors.username = "Username must be between 6 and 12 characters.";
    }

    if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    registerApiCall(form)
      .then((res) => {
        if (res.data.status) {
          handleLogin(res.data.token);
        } else {
          setErrors({ password: res.data.message ?? "Server Error" });
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setErrors({ password: e?.message ?? "Server Error" });
      });
  };

  return (
    <div className={style.register}>
      <h4>Log in / Register</h4>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          name="name"
          onChange={handleChange}
          value={form.name}
          required
          placeholder="Name"
          maxLength="20"
          className={style.input}
        />
        {errors.name && <p className={style.error}>{errors.name}</p>}
        <input
          name="username"
          onChange={handleChange}
          value={form.username}
          required
          placeholder="Username"
          maxLength="20"
          className={style.input}
        />
        {errors.username && <p className={style.error}>{errors.username}</p>}
        <input
          name="password"
          onChange={handleChange}
          value={form.password}
          required
          placeholder="Password"
          type={hide ? "text" : "password"}
          className={style.input}
        />
        <p onClick={() => setHide(!hide)} className={style.toggle}>
          <u>{hide ? "Hide" : "Show"}</u>
        </p>
        {errors.password && <p className={style.error}>{errors.password}</p>}
        <button type="submit" className={style.btn} disabled={loading}>
          {loading ? "Loading..." : "Log in/Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Register;
