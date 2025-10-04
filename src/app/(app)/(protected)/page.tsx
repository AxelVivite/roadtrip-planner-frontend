"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { IconPlus } from "@tabler/icons-react";

import { Button } from "@atoms/shadcn/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@atoms/shadcn/card";
import CompletePagination from "@molecules/complete-pagination";
import SearchBar from "@molecules/search-bar";
import pageSizeOptions from "@config/page-size-options";
import FetchError from "@config/interfaces/fetch-error";
import Countries, { Country } from "@config/interfaces/in/countries";
import { buildUrl } from "@utils/build-url";
import usefetchJson from "@utils/fetch-json";

type PageParams = {
  page: string;
  pageSize: string;
  name: string;
};

export default function Home() {
  const fetchJson = usefetchJson<Countries>();
  const tCountries = useTranslations("pages.countries");
  const params = useParams<PageParams>();
  const [page, setPage] = useState<number>(
    params.page ? Number(params.page) : 1
  );
  const [pageSize, setPageSize] = useState<number>(
    params.pageSize ? Number(params.pageSize) : pageSizeOptions[0]
  );
  const [totalPages, setTotalPages] = useState<number>(0);
  const [name, setName] = useState<string>(params.name ?? "");
  const [data, setData] = useState<Country[]>([]);

  React.useEffect(() => {
    fetchJson({
      url: buildUrl(
        `${process.env.NEXT_PUBLIC_API_URL}/api/countries${
          name && `/name/${name}`
        }`,
        {
          page,
          pageSize,
        }
      ),
    })
      .then((response) => {
        setData(response.data);
        setTotalPages(response.totalPages);
        console.log(response.data);
      })
      .catch((error: FetchError) => {
        if (
          error.status === 400 ||
          error.status === 404 ||
          error.status === 500
        ) {
          toast.error(tCountries(`${error.status}.title`), {
            description: tCountries(`${error.status}.description`),
          });
        }
      });
  }, [page, pageSize, name]);

  return (
    <div className="min-h-[calc(100vh-7rem)] flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-4 items-center">
        <SearchBar
          pageSizeState={[pageSize, setPageSize]}
          nameState={[name, setName]}
          setPage={setPage}
        ></SearchBar>
        <div className="w-full grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((country) => (
            <Link href={`/detailed/${country.cca3}`} key={country.cca3}>
              <Card className="flex flex-col justify-between h-full">
                <CardHeader>
                  <CardTitle>{`${country.flag} ${country.name.common}`}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="ml-auto">
                    <IconPlus />
                    {tCountries("add-to-roadtrip")}
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <CompletePagination pageState={[page, setPage]} totalPages={totalPages} />
    </div>
  );
}
