import useAuth from "@utils/auth/use-auth";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface Options<RequestType> {
  method?: Method;
  body?: RequestType;
}

interface Properties<RequestType> {
  url: string;
  options?: Options<RequestType>;
}

export const useFetchJSON = <RequestType, ResponseType>() => {
  const { token } = useAuth();

  const fetchJSON = async ({
    url,
    options,
  }: Properties<RequestType>): Promise<ResponseType> => {
    const { method = "GET", body } = options || {};

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Fetch error: ${res.status}`);
    }

    const data: ResponseType = await res.json();
    return data;
  };

  return fetchJSON;
};

export default useFetchJSON;
