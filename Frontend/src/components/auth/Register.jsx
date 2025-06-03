import React, { useContext, useState } from "react";
import style from "@/styles/Register.module.css";
import { AuthContext } from "@/context/authProvider";
import { registerApi, loginApi } from "@/api/userApis";

const initialState = {
  name: "",
  username: "",
  password: "",
};

const Register = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { handleLogin } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (form.name.trim().length < 6 || form.name.trim().length > 20) {
      newErrors.name = "Name must be between 6 and 20 characters.";
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && !validateForm()) return;

    setLoading(true);
    try {
      const api = isLogin ? loginApi : registerApi;
      const payload = isLogin
        ? {
            username: form.username,
            password: form.password,
          }
        : form;

      const res = await api(payload);

      if (res.data.status) {
        handleLogin(res.data.token);
      } else {
        setErrors({ password: res.data.message ?? "Server Error" });
      }
    } catch (e) {
      setErrors({ password: e?.message ?? "Server Error" });
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (e) => {
    e.preventDefault(); 
    setIsLogin(!isLogin);
    setForm(initialState);
    setErrors({});
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSubmit(e);
    }
  };

  return (
    <div className={style.register}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.tabs}>
          <button
            type="button"
            className={`${style.tab} ${isLogin ? style.active : ""}`}
            onClick={switchMode}
            style={{borderTopLeftRadius: "8px"}}
          >
            Login
          </button>
          <button
            type="button" 
            className={`${style.tab} ${!isLogin ? style.active : ""}`}
            onClick={switchMode}
            style={{borderTopRightRadius: "8px"}}
          >
            Register
          </button>
        </div>
        <div className={style.inputContainer}>
        {!isLogin && (
          <>
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
          </>
        )}

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
          onKeyPress={handleKeyPress}
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

        <button 
          type="submit" 
          className={style.btn} 
          disabled={loading}
        >
          {loading ? "Loading..." : isLogin ? "Login" : "Register"}
        </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
