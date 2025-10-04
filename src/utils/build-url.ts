interface UrlParams {
  [key: string]: string | number | undefined;
}

export const buildUrl = (base: string, params?: UrlParams): string => {
  if (!params) return base;

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${base}?${queryString}` : base;
};
