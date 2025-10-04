import { useTranslations } from "next-intl";

import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@atoms/shadcn/pagination";
import getPagesToPaginate from "@utils/get-pagination";

interface Properties {
  pageState: [number, React.Dispatch<React.SetStateAction<number>>];
  totalPages: number;
}

export default function CompletePagination({
  pageState,
  totalPages,
}: Properties) {
  const tCompletePagination = useTranslations("molecules.complete-pagination");
  const [page, setPage] = pageState;
  const pagesToPaginate = getPagesToPaginate({ page, totalPages });

  const previousPage = () => {
    setPage((prev) => prev - 1);
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  if (pagesToPaginate.length <= 1) {
    return <></>;
  }

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={previousPage}
              aria-label={tCompletePagination("aria-previous")}
            >
              {tCompletePagination("previous")}
            </PaginationPrevious>
          </PaginationItem>
        )}
        {pagesToPaginate.map((pageToPaginate) => (
          <PaginationItem>
            {typeof pageToPaginate === "string" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationButton
                onClick={() => setPage(pageToPaginate)}
                isActive={pageToPaginate === page}
              >
                {pageToPaginate}
              </PaginationButton>
            )}
          </PaginationItem>
        ))}
        {page < totalPages && (
          <PaginationItem>
            <PaginationNext
              onClick={nextPage}
              aria-label={tCompletePagination("aria-next")}
            >
              {tCompletePagination("next")}
            </PaginationNext>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
