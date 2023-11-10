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
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/loginResult" &&
      window.location.pathname !== "/signIn"
    ) {
      if (!(window.location.pathname === "/")) {
        window.localStorage.setItem("initPage", window.location.pathname);
      }
      router("/login");
    }
  }, [router]);

  return (
    <div className="layout wrap">
      {props.children}
      <AlertModal />
    </div>
  );
};

export default Layout;
