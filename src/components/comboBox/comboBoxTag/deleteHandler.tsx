// タグを削除する

import React from "react";

export default function DeleteHandler({
  index,
  setSelectedValue,
  setNewOptions,
  setIslandTags,
  newOptions,
  setIslandMembers,
  category,
  setError,
}) {
  const handleDelete = () => {
    setSelectedValue((value) => {
      const updatedValues = [...value];
      updatedValues.splice(index, 1);
      return updatedValues;
    });

    setNewOptions((options) => {
      const updatedOptions = [...options];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });

    if (category === "tag") {
      const tags = [...newOptions];
      tags.splice(index, 1);
      setIslandTags(tags);
    }
    if (category === "user") {
      const users = [...newOptions];
      users.splice(index, 1);
      setIslandMembers(users);
    }

    if (category === "userScout") {
      const users = [...newOptions];
      users.splice(index, 1);
      setIslandMembers(users);
      setError("");
    }
  };

  return <button onClick={handleDelete}>×</button>;
}
