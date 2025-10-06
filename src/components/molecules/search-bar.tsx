import React from "react";
import { useTranslations } from "next-intl";

import { Button } from "@atoms/shadcn/button";
import { Input } from "@atoms/shadcn/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@atoms/shadcn/select";
import pageSizeOptions from "@config/page-size-options";

interface Properties {
  pageSizeState: [number, React.Dispatch<React.SetStateAction<number>>];
  nameState: [string, React.Dispatch<React.SetStateAction<string>>];
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function SearchBar({
  pageSizeState,
  nameState,
  setPage,
}: Properties) {
  const tSearchBar = useTranslations("molecules.search-bar");
  const [pageSize, setPageSize] = pageSizeState;
  const [name, setName] = nameState;
  const [searchValue, setSearchValue] = React.useState<string>(name);

  const handlePageSizeChange = (pageSize: string) => {
    setPageSize(Number(pageSize));
    setPage(1);
  };

  const handleNameChange = () => {
    setName(searchValue);
    setPage(1);
  };

  return (
    <div className="w-full flex flex-col-reverse md:flex-row justify-between gap-2">
      <div className="flex w-full max-w-sm items-center gap-2">
        <Input
          type="text"
          placeholder={tSearchBar("search-placeholder")}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <Button type="submit" variant="outline" onClick={handleNameChange}>
          {tSearchBar("search-button")}
        </Button>
      </div>
      <Select
        defaultValue={pageSize.toString()}
        onValueChange={handlePageSizeChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={tSearchBar("select-page-size")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{tSearchBar("select-page-size")}</SelectLabel>
            {pageSizeOptions.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
