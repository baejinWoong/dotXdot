import React from "react";
import "../../styles/layout.scss";
import useAxiosInterceptor from "../../util/useAxiosInterceptor";
import AlertModal from "../modal/AlertModal";

interface layout_props {
  children: React.ReactElement | React.ReactElement[] | React.ReactNode;
}

/**
 *
 */
const Layout = (props: layout_props) => {
  useAxiosInterceptor();
  return (
    <div className="layout wrap">
      {props.children}
      <AlertModal />
    </div>
  );
};

export default Layout;

