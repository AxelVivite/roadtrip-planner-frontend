import { useTranslations } from "next-intl";

import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@atoms/shadcn/pagination";
import getPagination from "@utils/get-pagination";

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
  const pagesToPaginate = getPagination({ page, totalPages });

  const previousPage = () => {
    if (page > 1) {
      setPage((previous) => previous - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage((previous) => previous + 1);
    }
  };

  if (pagesToPaginate.length <= 1) {
    return <></>;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={previousPage}
            aria-label={tCompletePagination("aria-previous")}
          >
            {tCompletePagination("previous")}
          </PaginationPrevious>
        </PaginationItem>
        {pagesToPaginate.map((pageToPaginate, index) => (
          <PaginationItem key={index}>
              <PaginationButton
                onClick={() => setPage(pageToPaginate)}
                isActive={pageToPaginate === page}
              >
                {pageToPaginate}
              </PaginationButton>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={nextPage}
            aria-label={tCompletePagination("aria-next")}
          >
            {tCompletePagination("next")}
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
