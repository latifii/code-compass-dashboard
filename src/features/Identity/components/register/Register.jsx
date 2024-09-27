import logo from "../../../../assets/images/logo.svg";
import { useForm } from "react-hook-form";
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
import { httpService } from "../../../../core/http-service";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
function Register() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const routerErrors = useRouteError();
  const isSuccessOperation = useActionData();
  const submitForm = useSubmit();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();
  function onSubmit(data) {
    const { confirmPassword, ...userData } = data;
    submitForm(userData, { method: "post" });
  }
  const isSubmiting = navigation.state !== "idle";

  useEffect(
    function () {
      if (isSuccessOperation) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    },
    [isSuccessOperation]
  );
  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} style={{ height: "100px" }} />
        <h1 className="h2">{t("register.title")}</h1>
        <p className="lead">{t("register.introMessage")}</p>
        <p className="lead">
          {t("register.alreadyRegistered")}
          <Link to="/login" className="me-2">
            {t("register.signin")}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">{t("register.mobile")}</label>
                <input
                  className={`form-control form-control-lg ${
                    errors.mobile && "is-invalid"
                  }`}
                  {...register("mobile", {
                    required: "موبایل الزامی است.",
                    maxLength: 11,
                    minLength: 11,
                  })}
                />
                {errors.mobile && errors.mobile.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("register.validation.mobileRequired")}
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
                <label className="form-label"> {t("register.password")}</label>
                <input
                  {...register("password", {
                    required: "رمز عبور الزامی است",
                  })}
                  className={`form-control form-control-lg `}
                  type="password"
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("register.validation.passwordRequired")}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  {" "}
                  {t("register.repeatPassword")}
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "تکرار رمز عبور الزامی است.",
                    validate: (value) => {
                      if (watch("password") !== value) {
                        return "عدم تطابق با رمز وارد شده";
                      }
                    },
                  })}
                  className={`form-control form-control-lg `}
                  type="password"
                />
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <p className="text-danger small fw-bolder mt-1">
                      {t("register.validation.repeatPasswordRequired")}
                    </p>
                  )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "validate" && (
                    <p className="text-danger small fw-bolder mt-1">
                      {t("register.validation.notMatching")}
                    </p>
                  )}
              </div>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  className="btn btn-lg btn-primary"
                  disabled={isSubmiting}
                >
                  {t("register.register")}
                </button>
              </div>
              <div className="text-center mt-3">
                {isSuccessOperation && (
                  <div className="alert alert-success text-success p-2 mt-3">
                    {t("register.successOperation")}
                  </div>
                )}

                {routerErrors && (
                  <div className="alert alert-danger text-danger p-2 mt-3">
                    {routerErrors.response?.data.map((error, i) => (
                      <p className="mb-0" key={i}>
                        {error.description}
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
}

export default Register;

// eslint-disable-next-line react-refresh/only-export-components
export async function actionRegister({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("/Users", data);
  return response.status === 200;
}
