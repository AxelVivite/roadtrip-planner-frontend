"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { IconPlus } from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@atoms/shadcn/card";
import { Button } from "@atoms/shadcn/button";
import CardCountry from "@organisms/card-country";
import { Country } from "@config/interfaces/in/countries";
import FetchError from "@config/interfaces/fetch-error";
import useFetchJson from "@utils/fetch-json";
import { buildUrl } from "@utils/build-url";

type PageParams = {
  country: string;
};

export default function CountryDetailedPage() {
  const tDetailed = useTranslations("pages.detailed");
  const fetchCountry = useFetchJson<Country>();
  const fetchNeighbors = useFetchJson<Country[]>();
  const params = useParams<PageParams>();
  const [data, setData] = React.useState<Country | "NotFound">();
  const [neighbors, setNeighbors] = React.useState<Country[]>();

  React.useEffect(() => {
    fetchCountry({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/countries/codes/${params.country}`,
    })
      .then((response) => {
        setData(response);
        if (response.borders.length > 0) {
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Card>
          <CardHeader className="h-full">
            <Image
              className="m-auto"
              src={data.flags.svg}
              alt={`Drapeau ${data.name.common}`}
              width={192}
              height={192}
            />
          </CardHeader>
        </Card>
        <Card className="grow relative">
          <CardHeader>
            <CardTitle>
              <strong>{data.name.common}</strong>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>
                <strong>{`${tDetailed("capital", {
                  count: data.capital.length,
                })} : `}</strong>
                {data.capital.join(", ")}
              </li>
              <li>
                <strong>{`${tDetailed("region")} : `}</strong>
                {data.region}
              </li>
              <li>
                <strong>{`${tDetailed("continent", {
                  count: data.continents.length,
                })} : `}</strong>
                {data.continents.join(", ")}
              </li>
              <li>
                <strong>{`${tDetailed("language", {
                  count: Object.values(data.languages).length,
                })} : `}</strong>
                {Object.values(data.languages).join(", ")}
              </li>
              <li>
                <strong>{`${tDetailed("currency", {
                  count: Object.values(data.currencies).length,
                })} : `}</strong>
                {Object.values(data.currencies)
                  .map((currency) => `${currency.name} (${currency.symbol})`)
                  .join(", ")}
              </li>
            </ul>
          </CardContent>
          <CardFooter className="sm:p-0">
            <Button className="sm:absolute top-0 right-0 sm:m-6">
              <IconPlus />
              {tDetailed("add-to-roadtrip")}
            </Button>
          </CardFooter>
        </Card>
      </div>
      {neighbors && (
        <Card>
          <CardHeader>
            <CardTitle>
              <strong>{`${tDetailed("neighbors", {
                count: neighbors.length,
              })} : `}</strong>
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {neighbors.map((neighbor) => (
              <CardCountry country={neighbor} key={neighbor.cca3} />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
