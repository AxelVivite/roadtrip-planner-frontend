import Link from "next/link";
import { useTranslations } from "next-intl";

import { Card, CardFooter, CardHeader, CardTitle } from "@atoms/shadcn/card";
import RemoveCountryFromRoadtrip from "@atoms/buttons/remove-country-from-roadtrip";
import { Country } from "@config/interfaces/in/countries";

interface Properties {
  country: Country;
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
  order: number;
}

export default function CardCountryPlanning({
  country,
  setCountries,
  order
}: Properties) {
  return (
    <Link href={`/detailed/${country.cca3}`} key={country.cca3}>
      <Card className="flex flex-col justify-between h-full">
        <CardHeader>
          <CardTitle><strong>{`${order}: `}</strong>{`${country.name.common} ${country.flag}`}</CardTitle>
        </CardHeader>
        <CardFooter>
          <RemoveCountryFromRoadtrip
            cca3={country.cca3}
            setCountries={setCountries}
          />
        </CardFooter>
      </Card>
    </Link>
  );
}
