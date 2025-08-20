import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterSchema } from "./schemas";
import type z from "zod";

type FilterForm = z.infer<typeof filterSchema>;

export const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const parsed = filterSchema.parse(Object.fromEntries(searchParams));

  const { control } = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues: parsed,
  });

  const setFilterInUrl = (value: FilterForm["filters"]) => {
    const next = new URLSearchParams(searchParams);
    next.set("filters", value);
    setSearchParams(next);
  };

  return (
    <div className="flex justify-end items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"default"}>
            <SlidersHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-primary">
          <div className="grid gap-4">
            <div>
              <Label className="text-secondary">Filter Posts By:</Label>
            </div>

            <Controller
              name="filters"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  defaultValue="all"
                  className=""
                  {...field}
                  value={field.value} // controlado pelo RHF
                  onValueChange={(val) => {
                    const parsed = filterSchema.shape.filters.safeParse(val);
                    if (parsed.success) {
                      field.onChange(parsed.data); // agora é "all" | "following"
                      setFilterInUrl(parsed.data); // tipo compatível
                    }
                  }}
                >
                  <div className="flex items-center space-x-2 text-secondary ">
                    <RadioGroupItem
                      className="text-secondary"
                      value="all"
                      id="all"
                    />
                    <Label htmlFor="all">All</Label>
                  </div>
                  <div className="flex items-center space-x-2 text-secondary">
                    <RadioGroupItem
                      className="text-secondary"
                      value="following"
                      id="following"
                    />
                    <Label htmlFor="following">Following</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
