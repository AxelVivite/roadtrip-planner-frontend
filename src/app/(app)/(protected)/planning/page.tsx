"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import CardCountryPlanning from "@organisms/cards/card-country-planning";
import FormPlanning from "@organisms/forms/form-planning";
import FetchError from "@config/interfaces/fetch-error";
import { Country } from "@config/interfaces/in/countries";
import RoadtripCountries from "@config/interfaces/in/roadtrip-countries";
import { buildUrl } from "@utils/build-url";
import useFetchJson from "@utils/fetch-json";

export default function Planning() {
  const fetchRoadtripCountries = useFetchJson<void, RoadtripCountries>();
  const fetchDetailedCountries = useFetchJson<void, Country[]>();
  const tCountries = useTranslations("pages.countries");
  const [data, setData] = React.useState<Country[]>([]);

  React.useEffect(() => {
    fetchRoadtripCountries({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/roadtrip/countries`,
    })
      .then((response) => {
        if (response) {
          if (response && response.length > 0) {
            getDetailedCountries(
              response.map((country) => country.cca3).join(","),
              response
            );
          }
        }
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
  }, []);

  const getDetailedCountries = (
    codes: string,
    rawCountries: RoadtripCountries
  ) => {
    fetchDetailedCountries({
      url: buildUrl(`${process.env.NEXT_PUBLIC_API_URL}/api/countries/codes`, {
        codes,
      }),
    })
      .then((response) => {
        if (response) {
          const orderMap = new Map(
            rawCountries.map((item) => [item.cca3, item.order])
          );
          const sortedCountries = response.sort(
            (a, b) =>
              (orderMap.get(a.cca3) ?? Infinity) -
              (orderMap.get(b.cca3) ?? Infinity)
          );
          setData(sortedCountries);
        }
      })
      .catch((error: FetchError) => {
        toast.error(tCountries(`${error.status}.title`), {
          description: tCountries(`${error.status}.description`),
        });
      });
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <FormPlanning countries={data} />
      <div className="w-full grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((country, index) => (
          <CardCountryPlanning
            country={country}
            key={country.cca3}
            setCountries={setData}
            order={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
