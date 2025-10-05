import Link from "next/link";

import { Card, CardFooter, CardHeader, CardTitle } from "@atoms/shadcn/card";
import AddCountryToRoadtrip from "@atoms/buttons/add-country-to-roadtrip";
import { Country } from "@config/interfaces/in/countries";

interface Properties {
  country: Country;
}

export default function CardCountry({ country }: Properties) {
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
