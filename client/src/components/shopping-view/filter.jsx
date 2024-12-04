import { filterOptions } from "@/config";
import React, { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFilter = ({ handleFilter, filter }) => {
  return (
    <div className="border rounded-lg shadow-sm ">
      <div className="border-b p4">
        <h2 className="p-4 text-lg font-extrabold">Filter</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="font-normal uppercase text-nowrap">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    className="flex items-center gap-2 font-normal"
                    key={option?.id}
                  >
                    <Checkbox
                      checked={
                        filter &&
                        Object.keys(filter).length > 0 &&
                        filter[keyItem] &&
                        filter[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option?.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
