interface Properties {
  page: number;
  totalPages: number;
  windowSize?: number;
}

function getPagination({
  page,
  totalPages,
  windowSize = 3,
}: Properties): (string | number)[] {
  const delta = (windowSize - 1) / 2;
  const range = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= page - delta && i <= page + delta)
    ) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }

  return range;
}

export default getPagination;
