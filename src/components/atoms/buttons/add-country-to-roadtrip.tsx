import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { IconPlus } from "@tabler/icons-react";

import { Button, ButtonProps } from "@atoms/shadcn/button";
import useFetchJson from "@utils/fetch-json";
import FetchError from "@config/interfaces/fetch-error";
import AddCountryToRoadtripInterface from "@config/interfaces/out/add-country-to-roadtrip";

interface Properties {
  button?: ButtonProps;
  cca3: string;
}

export default function AddCountryToRoadtrip({ button, cca3 }: Properties) {
  const tAddRoadTrip = useTranslations("atoms.buttons.add-country-to-roadtrip");
  const fetchJson = useFetchJson<AddCountryToRoadtripInterface>();

  const handleClick = (event: { preventDefault: () => void; stopPropagation: () => void; }) => {
    event.preventDefault();
    event.stopPropagation();
    fetchJson({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/roadtrip/countries/`,
      options: { method: "POST", body: { cca3 } },
    })
      .then(() => {
        toast(tAddRoadTrip("success.title"), {
          description: tAddRoadTrip("success.description"),
        });
      })
      .catch((error: FetchError) => {
        if (error.status === 400 || error.status === 409) {
          toast.error(tAddRoadTrip(`${error.status}.title`), {
            description: tAddRoadTrip(`${error.status}.description`),
          });
        }
      });
  };

  return (
    <Button
      aria-label={tAddRoadTrip("aria-button")}
      variant="outline"
      className="ml-auto"
      onClick={handleClick}
      {...button}
    >
      <IconPlus />
      {tAddRoadTrip("button")}
    </Button>
  );
}
