"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Separator } from "@atoms/shadcn/separator";
import TypographyH1 from "@atoms/typography/typographyH1";
import CardCountryDetailed from "@organisms/cards/cards-country-detailed";
import CardNeighbors from "@organisms/cards/card-neighbors";
import { Country } from "@config/interfaces/in/countries";
import FetchError from "@config/interfaces/fetch-error";
import useFetchJson from "@utils/fetch-json";
import { buildUrl } from "@utils/build-url";

type PageParams = {
  country: string;
};

export default function CountryDetailedPage() {
  const tDetailed = useTranslations("pages.detailed");
  const fetchCountry = useFetchJson<void, Country>();
  const fetchNeighbors = useFetchJson<void, Country[]>();
  const params = useParams<PageParams>();
  const [data, setData] = React.useState<Country | "NotFound">();
  const [neighbors, setNeighbors] = React.useState<Country[]>();

  React.useEffect(() => {
    fetchCountry({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/countries/codes/${params.country}`,
    })
      .then((response) => {
        setData(response);
        if (response && response.borders.length > 0) {
          getNeighbors(response.borders.join(","));
        }
      })
      .catch((error: FetchError) => {
        errorToast(error);
        if (error.status === 404) {
          setData("NotFound");
        }
      });
  }, []);

  const getNeighbors = (codes: string) => {
    fetchNeighbors({
      url: buildUrl(`${process.env.NEXT_PUBLIC_API_URL}/api/countries/codes`, {
        codes,
      }),
    })
      .then((response) => {
        setNeighbors(response);
      })
      .catch((error: FetchError) => {
        errorToast(error);
      });
  };

  const errorToast = (error: FetchError) => {
    if (error.status === 400 || error.status === 404 || error.status === 500) {
      toast.error(tDetailed(`${error.status}.title`), {
        description: tDetailed(`${error.status}.description`),
      });
    }
  };

  if (!data) return <></>;
  if (data === "NotFound") return notFound();

  return (
    <div className="flex flex-col gap-6">
      <TypographyH1 className="mr-auto">{tDetailed("title")}</TypographyH1>
      <Separator />
      <div className="flex flex-col gap-4">
        <CardCountryDetailed country={data} />
        {neighbors && <CardNeighbors neighbors={neighbors} />}
      </div>
    </div>
  );
}
