import { useForm } from "react-hook-form";
import { httpInterceptedService } from "../../core/http-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCategoryContext } from "../../contexts/app/CategoriesContext";
// import { useTranslation } from "react-i18next";

function AddOrUpdateCategories({ setShowFormCategory }) {
  //   const { t } = useTranslation();
  const navigate = useNavigate();
  const { category, setCategory } = useCategoryContext();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setShowFormCategory(false);
    setCategory(null);
    const res = httpInterceptedService.post("/CourseCategory", data);
    toast.promise(res, {
      pending: "در حال اضافه کردن دوره",
      success: {
        render() {
          const url = new URL(window.location.href);
          navigate(url.pathname + url.search);
          return "دوره با موفقیت اضافه شد";
        },
      },
      error: {
        render({ data }) {
          return `مشکلی پیش آماده ${data.res.data.code}`;
        },
      },
    });
  }

  function handleClose() {
    setShowFormCategory(false);
    setCategory(null);
  }
  useEffect(
    function () {
      if (category) {
        setValue("name", category.name);
        setValue("id", category.id);
      }
    },
    [category]
  );
  return (
    <div className="card">
      <div className="card-body">
        <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="form-label">نام</label>
            <input
              className="form-control form-control-lg undefined"
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && errors.name.type === "required" && (
            <p className="text-danger small fw-bolder mt-1">
              این فیلد اجباری است.
            </p>
          )}
          <div className="text-start mt-3">
            <button
              type="button"
              className="btn btn-lg btn-secondary ms-2"
              onClick={handleClose}
            >
              بستن
            </button>
            <button type="submit" className="btn btn-lg btn-primary">
              ثبت تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddOrUpdateCategories;
