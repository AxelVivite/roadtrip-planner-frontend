import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { IconMinus } from "@tabler/icons-react";

import { Button, ButtonProps } from "@atoms/shadcn/button";
import useFetchJson from "@utils/fetch-json";
import FetchError from "@config/interfaces/fetch-error";
import AddCountryToRoadtripInterface from "@config/interfaces/out/add-country-to-roadtrip";
import { Country } from "@config/interfaces/in/countries";

interface Properties {
  button?: ButtonProps;
  cca3: string;
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
}

export default function RemoveCountryFromRoadtrip({
  button,
  cca3,
  setCountries
}: Properties) {
  const tRemoveRoadTrip = useTranslations("atoms.buttons.remove-country-from-roadtrip");
  const fetchJson = useFetchJson<AddCountryToRoadtripInterface>();

  const handleClick = (event: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    event.preventDefault();
    event.stopPropagation();
    fetchJson({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/roadtrip/countries/${cca3}`,
      options: { method: "DELETE" },
    })
      .then(() => {
        setCountries((prev) => prev.filter((country) => country.cca3 !== cca3))
        toast(tRemoveRoadTrip("success.title"), {
          description: tRemoveRoadTrip("success.description"),
        });
      })
      .catch((error: FetchError) => {
        if (error.status === 404) {
          toast.error(tRemoveRoadTrip(`${error.status}.title`), {
            description: tRemoveRoadTrip(`${error.status}.description`),
          });
        }
      });
  };

  return (
    <Button
      aria-label={tRemoveRoadTrip("aria-button")}
      variant="outline"
      className="ml-auto"
      onClick={handleClick}
      {...button}
    >
      <IconMinus />
      {tRemoveRoadTrip("button")}
    </Button>
  );
}
