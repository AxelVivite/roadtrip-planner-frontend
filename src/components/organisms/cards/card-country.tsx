import Link from "next/link";
import { useTranslations } from "next-intl";
import { IconPlus } from "@tabler/icons-react";

import { Card, CardFooter, CardHeader, CardTitle } from "@atoms/shadcn/card";
import { Button } from "@atoms/shadcn/button";
import { Country } from "@config/interfaces/in/countries";
import AddCountryToRoadtrip from "@/components/atoms/buttons/add-country-to-roadtrip";

interface Properties {
  country: Country;
}

export default function CardCountry({ country }: Properties) {
  const tCardCountry = useTranslations("organisms.card.country");

  return (
    <Link href={`/detailed/${country.cca3}`} key={country.cca3}>
      <Card className="flex flex-col justify-between h-full">
        <CardHeader>
          <CardTitle>{`${country.flag} ${country.name.common}`}</CardTitle>
        </CardHeader>
        <CardFooter>
          <AddCountryToRoadtrip cca3={country.cca3}/>
        </CardFooter>
      </Card>
    </Link>
  );
}
