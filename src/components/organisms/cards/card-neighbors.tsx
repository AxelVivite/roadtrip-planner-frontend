import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader, CardTitle } from "@atoms/shadcn/card";
import CardCountry from "@organisms/cards/card-country";
import { Country } from "@config/interfaces/in/countries";

interface Properties {
  neighbors: Country[];
}

export default function CardNeighbors({ neighbors }: Properties) {
  const tCardNeighbors = useTranslations("organisms.card.neighbors");

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <strong>{`${tCardNeighbors("title", {
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
  );
}
