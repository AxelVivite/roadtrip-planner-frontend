import FetchError from "@config/interfaces/fetch-error";
import useAuth from "@utils/hook/use-auth";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface Options<RequestType> {
  method?: Method;
  body?: RequestType;
}

interface Properties<RequestType> {
  url: string;
  options?: Options<RequestType>;
}

const useFetchJson = <RequestType = void, ResponseType = undefined>() => {
  const { accessToken } = useAuth();

  const fetchJson = async ({
    url,
    options,
  }: Properties<RequestType>): Promise<ResponseType | undefined> => {
    const { method = "GET", body } = options || {};

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const errData = (await res
        .json()
        .catch(() => ({}))) as Partial<FetchError>;
      const fetchError: FetchError = {
        status: res.status,
        statusText: res.statusText,
        message: errData.message || `Fetch error: ${res.status}`,
      };
      throw fetchError;
    }

    try {
      const data: ResponseType = await res.json();
      return data;
    } catch {
      return undefined;
    }
  };

  return fetchJson;
};

export default useFetchJson;
