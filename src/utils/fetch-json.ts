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

const usefetchJson = <ResponseType, RequestType = void>() => {
  const { accessToken } = useAuth();

  const fetchJson = async ({
    url,
    options,
  }: Properties<RequestType>): Promise<ResponseType> => {
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

    const data: ResponseType = await res.json();
    return data;
  };

  return fetchJson;
};

export default usefetchJson;
