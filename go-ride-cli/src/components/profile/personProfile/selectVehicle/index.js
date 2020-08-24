import React from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();
const vehicleOptions = [
  { value: 'motorbike', label: 'Motorbike' },
  { value: 'car', label: 'Car' },
]
export default function selectVehicle() {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={vehicleOptions}
    />
  );
}
