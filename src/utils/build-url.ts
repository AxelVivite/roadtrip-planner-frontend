interface UrlParameters {
  [key: string]: string | number | undefined;
}

export const buildUrl = (base: string, parameters?: UrlParameters): string => {
  if (!parameters) return base;

  const searchParameters = new URLSearchParams();

  for (const [key, value] of Object.entries(parameters)) {
    if (value) {
      searchParameters.append(key, String(value));
    }
  }

  const queryString = searchParameters.toString();
  return queryString ? `${base}?${queryString}` : base;
};
