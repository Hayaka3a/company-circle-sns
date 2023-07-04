import React from "react";

export default function DeleteButton({ index, setSelectedValue }) {
  const deleteNameHandler = () => {
    setSelectedValue((value) => {
      const updatedValues = [...value];
      updatedValues.splice(index, 1);
      return updatedValues;
    });
  };

  deleteNameHandler();
  return null;
}
