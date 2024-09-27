import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import { httpInterceptedService } from "../core/http-service";
import HeaderPanel from "../components/HeaderPanel";
import { Suspense, useState } from "react";
import CategoryList from "../features/categories/CategoryList";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import AddOrUpdateCategories from "../features/categories/AddOrUpdateCategories";
import { useCategoryContext } from "../contexts/app/CategoriesContext";

function CategoryCourse() {
  const data = useLoaderData();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [showFormCategory, setShowFormCategory] = useState(false);
  const navigate = useNavigate();
  const { category } = useCategoryContext();
  function deleteCategory(id) {
    setShowDeleteModal(true);
    setSelectedCategory(id);
  }

  async function handleRemove() {
    setShowDeleteModal(false);
    const res = httpInterceptedService.delete(
      `/CourseCategory/${selectedCategory}`
    );

    toast.promise(res, {
      pending: "در حال حذف...",
      success: {
        render() {
          const url = new URL(window.location.href);
          navigate(url.pathname + url.search);
          return "عملیات با موفقیت انجام شد";
        },
      },
      error: {
        render({ data }) {
          return `این عملیات مشکل دارد . ${data.response.data.code}`;
        },
      },
    });
  }
  return (
    <>
      <div>
        <HeaderPanel name="دسته بندی دوره ها">
          {!showFormCategory && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowFormCategory(true)}
            >
              اضافه کردن دوره
            </button>
          )}
        </HeaderPanel>
        {(showFormCategory || category) && (
          <AddOrUpdateCategories setShowFormCategory={setShowFormCategory} />
        )}

        <Suspense
          fallback={<p className="text-info">در حال دریافت اطلاعات ...</p>}
        >
          <Await resolve={data.categories}>
            {(loadCategory) => (
              <CategoryList
                categories={loadCategory}
                deleteCategory={deleteCategory}
                setShowFormCategory={setShowFormCategory}
              />
            )}
          </Await>
        </Suspense>
      </div>
      <Modal
        isOpen={showDeleteModal}
        open={setShowDeleteModal}
        title="حذف"
        body="آیا از حذف دوره مطمئن هستید؟"
      >
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShowDeleteModal(false)}
        >
          انصراف
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleRemove()}
        >
          حذف
        </button>
      </Modal>
    </>
  );
}
export default CategoryCourse;

export async function categoryLoader({ request }) {
  return defer({
    categories: loadCategory(request),
  });
}

async function loadCategory(request) {
  const page = new URL(request.url).searchParams.get("page") || 1;
  const pageSize = import.meta.env.VITE_PAGE_SIZE;
  let url = "/CourseCategory/sieve";
  url += `?page=${page}&pageSize=${pageSize}`;

  const res = await httpInterceptedService.get(url);
  return res.data;
}
