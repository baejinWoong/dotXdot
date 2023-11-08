/* eslint-disable no-restricted-globals */
import React from "react";
import "../../styles/layout.scss";
import useAxiosInterceptor from "../../util/useAxiosInterceptor";
import AlertModal from "../modal/AlertModal";
import { useNavigate } from "react-router-dom";

interface layout_props {
  children: React.ReactElement | React.ReactElement[] | React.ReactNode;
}

/**
 *
 */
const Layout = (props: layout_props) => {
  useAxiosInterceptor();

  const router = useNavigate();

  React.useEffect(() => {
    if (
      !window.sessionStorage.getItem("Authorization") &&
      location.pathname !== "/login" &&
      location.pathname !== "/loginResult" &&
      location.pathname !== "/signIn"
    ) {
      router("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="layout wrap">
      {props.children}
      <AlertModal />
    </div>
  );
};

export default Layout;
