import axios from "../api/http";
import { AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useEffect } from "react";

import { useRecoilState } from "recoil";
import { alertModalRecoil, loaderModalRecoil } from "../recoil/atom";
import { ERRORCODE_TO_TEXT_JSON, SESSION_CLEAR_ERRORCODE } from "../api/util";

const useAxiosInterceptor = () => {
  const [, setAlertModalState] = useRecoilState(alertModalRecoil);
  const [, setLoaderState] = useRecoilState(loaderModalRecoil);

  const requestHandler = (request: InternalAxiosRequestConfig<any>) => {
    request.headers.set(
      "Authorization",
      window.sessionStorage.getItem("Authorization")
    );
    setLoaderState({ isOpen: true });
    return request;
  };

  const responseHandler = async (response: AxiosResponse<any, any>) => {
    // response setting
    const header = response.headers;
    if (header instanceof AxiosHeaders) {
      if (header.has("Authorization")) {
        window.sessionStorage.setItem(
          "Authorization",
          header.get("Authorization")?.toString() ?? ""
        );
      }
      if (header.has("Refresh")) {
        window.sessionStorage.setItem(
          "Refresh",
          header.get("Refresh")?.toString() ?? ""
        );
      }
    }

    if (["E40101"].find((code) => code === response.data?.status?.code)) {
      const newConfig = response.config;
      newConfig.headers.set(
        "Refresh",
        window.sessionStorage.getItem("Refresh")
      );
      return await axios.request(newConfig);
    }

    if (response.data?.status?.code) {
      const errorCode = response.data.status
        .code as keyof typeof ERRORCODE_TO_TEXT_JSON;
      if (SESSION_CLEAR_ERRORCODE.find((code) => code === errorCode)) {
        setAlertModalState({
          alertText: ERRORCODE_TO_TEXT_JSON[errorCode],
          isOpen: true,
          clickButtonCallback: () => {
            window.sessionStorage.clear();
            window.location.href = "/login";
          },
        });
      }
    }

    setLoaderState({ isOpen: false });
    return response;
  };

  const errorHandler = (error: any) => {
    if (error.response) {
      const errorCode = error.response.data.status
        .code as keyof typeof ERRORCODE_TO_TEXT_JSON;
      if (errorCode === "E40006") {
        setAlertModalState({
          alertText: `${ERRORCODE_TO_TEXT_JSON[errorCode]}\n오류횟수: ${
            error.response.data.data as string
          }회`,
          isOpen: true,
          clickButtonCallback: () => {
            return false;
          },
        });
      } else {
        setAlertModalState({
          alertText:
            ERRORCODE_TO_TEXT_JSON[errorCode] ??
            "알 수 없는 오류가 발생하였습니다.\n관리자에게 문의 해 주세요.",
          isOpen: true,
          clickButtonCallback: () => {
            return false;
          },
        });
      }
      setLoaderState({ isOpen: false });
      return error.response;
    }
    setLoaderState({ isOpen: false });
    return error;
  };
  const requestInterceptor = axios.interceptors.request.use((request) =>
    requestHandler(request)
  );
  const responseInterceptor = axios.interceptors.response.use(
    async (response) => await responseHandler(response),
    (error) => errorHandler(error)
  );
  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [requestInterceptor, responseInterceptor]);
};

export default useAxiosInterceptor;

