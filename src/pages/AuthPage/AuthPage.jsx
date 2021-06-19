import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import { localSt } from "common/utils/localStorage";
import { useAppStateContext } from "../../useAppStateContext";
import { auth } from "../../api";
import { AuthForm } from "./AuthForm";
import "./index.css";

export const AuthPage = () => {
  const histroy = useHistory();
  const [authData, setAuthData] = useState({});
  const { login } = useAppStateContext();
  const { isError, error } = useQuery(["auth", authData], () => auth(authData), {
    enabled: !!authData.email,
    retry: false,
    onSuccess: ({ data }) => {
      localSt.setItem("token", data.token);
      login();
      histroy.push("/");
    },
  });

  const onSubmit = (data) => {
    setAuthData(data);
  };

  return <AuthForm formSubmit={onSubmit} isErrorAuth={isError} errorAuth={error && error.message} />;
};
