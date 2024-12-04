import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { toast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  // khi người dùng nhấn đăng nhập thì sẽ thực hiện loginUser
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      console.log("🚀 ~ dispatch ~ data:", data);
      if (data.payload?.success) {
        toast({
          title: data.payload.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create New Account
        </h1>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      ></CommonForm>
      <div className="text-center">
        <p className="mt-2">
          Don't have an account ?
          <Link
            className="ml-1 font-medium text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
