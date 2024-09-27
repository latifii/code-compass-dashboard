import {
  Link,
  redirect,
  useActionData,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
import logo from "../../../../assets/images/logo.svg";
import { httpService } from "../../../../core/http-service";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
const Login = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitForm = useSubmit();
  function onSubmit(data) {
    submitForm(data, { method: "post" });
  }

  const isSuccessOperation = useActionData();
  const routeErrors = useRouteError();
  const navigation = useNavigation();
  const isSubmiting = navigation.state !== "idle";
  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} style={{ height: "100px" }} />
        <h1 className="h2">{t("login.title")}</h1>
        <p className="lead">{t("login.introMessage")}</p>
        <p className="lead">
          {t("login.areNotRegistered")}
          <Link to="/register" className="me-2">
            {t("login.register")}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">{t("login.mobile")}</label>
                <input
                  className="form-control form-control-lg"
                  {...register("mobile", {
                    required: true,
                    maxLength: 11,
                    minLength: 11,
                  })}
                />
                {errors.mobile && errors.mobile.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("login.validation.mobileRequired")}
                  </p>
                )}
                {errors.mobile &&
                  (errors.mobile.type === "maxLength" ||
                    errors.mobile.type === "minLength") && (
                    <p className="text-danger small fw-bolder mt-1">
                      {t("register.validation.mobileLength")}
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">{t("login.password")}</label>
                <input
                  className="form-control form-control-lg mb-2"
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("login.validation.passwordRequired")}
                  </p>
                )}
              </div>
              <div className="text-center mt-3">
                <button
                  disabled={isSubmiting}
                  type="submit"
                  className="btn btn-lg btn-primary"
                >
                  {isSubmiting ? t("login.signingin") : t("login.signin")}
                </button>
              </div>
              <div className="text-center mt-3">
                {isSuccessOperation && (
                  <div className="alert alert-success text-success p-2 mt-3">
                    {t("register.successOperation")}
                  </div>
                )}

                {routeErrors && (
                  <div className="alert alert-danger text-danger p-2 mt-3">
                    {routeErrors.response?.data.map((error, i) => (
                      <p className="mb-0" key={i}>
                        {t(`login.validation.${error.code}`)}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

// eslint-disable-next-line react-refresh/only-export-components
export async function loginAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("/Users/login", data);
  if (response.status === 200) {
    localStorage.setItem("token", response?.data.token);
    return redirect("/");
  }
}
