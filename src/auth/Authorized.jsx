import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../components/utils/AxiosInstance";

const Authorized =  () => {
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
        const res = await api.get("/token/verify");
        if (res.data.message === "not verified") {
          return navigate("/login");
        } 
        else if (res.data.message === "token Verified"){
          return true;
        }
    } catch (error) {
      console.log(error);
      navigate("/login")
      toast.error("Something Went Wrong!");
    }
  };


  

  useEffect(() => {
    checkAuth();
  }, []);
};

export default Authorized;
