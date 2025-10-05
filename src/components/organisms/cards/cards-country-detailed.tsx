import Image from "next/image";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@atoms/shadcn/card";
import { Country } from "@config/interfaces/in/countries";
import AddCountryToRoadtrip from "@atoms/buttons/add-country-to-roadtrip";

interface Properties {
  country: Country;
}

export default function CardCountryDetailed({ country }: Properties) {
  const tDetailed = useTranslations("organisms.card.country-detailed");

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Card>
        <CardHeader className="h-full">
          <Image
            className="m-auto"
            src={country.flags.svg}
            alt={`Drapeau ${country.name.common}`}
            width={192}
            height={192}
          />
        </CardHeader>
      </Card>
      <Card className="grow relative">
        <CardHeader>
          <CardTitle>
            <strong>{country.name.common}</strong>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            <li>
              <strong>{`${tDetailed("capital", {
                count: country.capital.length,
              })} : `}</strong>
              {country.capital.join(", ")}
            </li>
            <li>
              <strong>{`${tDetailed("region")} : `}</strong>
              {country.region}
            </li>
            <li>
              <strong>{`${tDetailed("continent", {
                count: country.continents.length,
              })} : `}</strong>
              {country.continents.join(", ")}
            </li>
            <li>
              <strong>{`${tDetailed("language", {
                count: Object.values(country.languages).length,
              })} : `}</strong>
              {Object.values(country.languages).join(", ")}
            </li>
            <li>
              <strong>{`${tDetailed("currency", {
                count: Object.values(country.currencies).length,
              })} : `}</strong>
              {Object.values(country.currencies)
                .map((currency) => `${currency.name} (${currency.symbol})`)
                .join(", ")}
            </li>
          </ul>
        </CardContent>
        <CardFooter className="sm:p-0">
          <AddCountryToRoadtrip
            cca3={country.cca3}
            button={{
              variant: "default",
              className: "sm:absolute top-0 right-0 sm:m-6",
            }}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
