import Arrow from "../../assets/icons/arrow-pages.svg?react";
import cn from "classnames";
import classes from "./pagesNum.module.css";

type PagesNumProps = {
  count: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
};

export const PagesNum = ({
  count,
  currentPage,
  onPageChange,
  itemsPerPage = 5,
}: PagesNumProps) => {
  const totalPages = Math.ceil(count / itemsPerPage);

  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push("...");
      } else {
        for (let i = 2; i < Math.min(4, totalPages); i++) {
          pages.push(i);
        }
      }

      const start = Math.max(2, currentPage - 1);
      console.log(start);
      const end = Math.min(totalPages - 1, currentPage + 1);
      console.log(end);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      } else {
        for (let i = totalPages - 2; i < totalPages; i++) {
          if (!pages.includes(i)) {
            pages.push(i);
          }
        }
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={classes["pagesnum"]}>
      {totalPages > 1 && (
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={cn(
            classes["pagesnum__button"],
            classes["pagesnum__button-prev"]
          )}
        >
          <Arrow className={classes["pagesnum__arrow"]} />
        </button>
      )}

      {generatePages().map((page, index) =>
        page === "..." ? (
          <button
            key={`ellipsis-${index}`}
            className={cn(
              classes["pagesnum__dots"],
              classes["pagesnum__button"]
            )}
          >
            ...
          </button>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={cn(classes["pagesnum__button"], {
              [classes["active"]]: page === currentPage,
            })}
          >
            {page}
          </button>
        )
      )}

      {totalPages > 1 && (
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={cn(
            classes["pagesnum__button"],
            classes["pagesnum__button-next"]
          )}
        >
          <Arrow />
        </button>
      )}
    </div>
  );
};
