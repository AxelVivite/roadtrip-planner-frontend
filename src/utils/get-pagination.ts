interface Properties {
  page: number;
  totalPages: number;
  maxVisible?: number;
}

function getPagination({
  page,
  totalPages,
  maxVisible = 5,
}: Properties): (number)[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  let start = Math.max(page - 1, 2);
  let end = Math.min(page + 1, totalPages - 1);

  if (page === 1 || page === 2) {
    start = 2;
    end = 4;
  } else if (page === totalPages || page === totalPages - 1) {
    start = totalPages - 3;
    end = totalPages - 1;
  }

  const middle = Array.from({ length: end - start + 1 }, (_, index) => start + index);

  return [1, ...middle, totalPages];
}

export default getPagination;
