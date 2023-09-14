import { useState } from "react";

import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDebouncedState } from "@mantine/hooks";

import EditUser from "./editUser";

const User: React.FC = () => {
  const [searchValue, setSearchVal] = useDebouncedState("", 400, {
    leading: true,
  });
  const [editPopup, setEditPopup] = useState(false);
  const [editInfo] = useState();

  const handleEditPopup = (editPopup) => {
    setEditPopup(editPopup);
  };

  return (
    <div>
      <TextInput
        placeholder="Search employees..."
        size="md"
        radius="md"
        icon={<IconSearch size={16} />}
        defaultValue={searchValue}
        onChange={(e) => setSearchVal(e.currentTarget.value)}
        sx={{ width: "100%", maxWidth: "300px", margin: "10px 40px" }}
        variant="filled"
      />

      {editPopup && (
        <EditUser
          editInfo={editInfo}
          editPopup={editPopup}
          handleEditPopup={handleEditPopup}
        />
      )}
    </div>
  );
};

export default User;
