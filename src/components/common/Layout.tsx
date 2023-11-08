/* eslint-disable no-restricted-globals */
import React from "react";
import "../../styles/layout.scss";
import useAxiosInterceptor from "../../util/useAxiosInterceptor";
import AlertModal from "../modal/AlertModal";
import { snsSignIn } from "../../api/login";

interface layout_props {
  children: React.ReactElement | React.ReactElement[] | React.ReactNode;
}

/**
 *
 */
const Layout = (props: layout_props) => {
  useAxiosInterceptor();

  if (
    !window.sessionStorage.getItem("Authorization") &&
    location.pathname !== "/login" &&
    location.pathname !== "/loginResult"
  ) {
    location.replace("/login");
  }

  React.useEffect(() => {
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
