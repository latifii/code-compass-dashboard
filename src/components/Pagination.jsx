import _ from "lodash";
import { useSearchParams } from "react-router-dom";

function Pagination({
  totalRecords,
  pageSize = import.meta.env.VITE_PAGE_SIZE,
}) {
  const page = Math.ceil(totalRecords / pageSize);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +searchParams.get("page") || 1;
  function handlePrev() {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  }

  function handleNext() {
    if (currentPage < page) {
      setSearchParams({ page: currentPage + 1 });
    }
  }

  function handlePage(pageArg) {
    setSearchParams({ page: pageArg });
  }
  return (
    <nav>
      <ul className="pagination pagination-lg">
        <li
          className={`page-item ${
            currentPage > 1 ? "" : "disabled opacity-50"
          }`}
          onClick={handlePrev}
        >
          <a className="page-link">قبلی</a>
        </li>

        {_.times(page, (i) => (
          <li
            className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
            key={`index-${i + 1}`}
            onClick={() => handlePage(i + 1)}
          >
            <a className="page-link">{i + 1}</a>
          </li>
        ))}
        {}
        <li
          className={`page-item  ${
            currentPage < page ? "" : "disabled opacity-50"
          }`}
          onClick={handleNext}
        >
          <a className="page-link">بعدی</a>
        </li>
      </ul>
    </nav>
  );
}
export default Pagination;
