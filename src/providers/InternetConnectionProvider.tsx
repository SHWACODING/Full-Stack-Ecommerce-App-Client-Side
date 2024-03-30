import { ToastId, useToast } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef } from "react";
import { BsWifiOff } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { networkMode } from "../app/features/networkSlice";

const InternetConnectionProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  const toast = useToast();

  const toastIdRef = useRef<ToastId>();

  const close = () => {
    toast.closeAll();
  };

  const addToast = () => {
    toastIdRef.current = toast({
      title: "You Are Offline.!",
      description: "Please check your internet connection",
      status: "warning",
      duration: 5000,
      isClosable: true,
      icon: <BsWifiOff size={20} />,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setOnline = () => {
    dispatch(networkMode(true));
    close();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setOffline = () => {
    dispatch(networkMode(false));
    addToast();
  };

  useEffect(() => {
    window.addEventListener("online", setOnline);

    window.addEventListener("offline", setOffline);

    return () => {
      // ** Clean Up **
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, [setOffline, setOnline]);

  return children;
};

export default InternetConnectionProvider;
