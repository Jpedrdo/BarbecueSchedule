"use client";
import {
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Participants } from "@/interfaces";

type Props = {
  participants: Participants[];
  checked: Array<number>;
  setChecked: (e: Array<number>) => void;
  handleRemovePart?: (e: number) => void;
  edit?: boolean;
};

export default function ParticipantsList({
  participants,
  checked,
  setChecked,
  handleRemovePart,
  edit,
}: Props) {
  const handleToggle = (id: number) => () => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) newChecked.push(id);
    else newChecked.splice(currentIndex, 1);

    setChecked(newChecked);
  };

  const handleRemove = (id: number) => {
    if (handleRemovePart) {
      handleToggle(id);
      handleRemovePart(id);
    }
  };

  return (
    <List dense={true} sx={{ width: "100%" }}>
      {participants.map(({ name, personPrice, id }, i) => {
        const labelId = `checkbox-list-label-${i}`;
        const isChecked = checked.indexOf(id) !== -1;

        return (
          <ListItem
            key={i}
            secondaryAction={
              <Stack
                sx={{ textDecoration: isChecked ? "line-through" : "" }}
                direction="row"
                alignItems="center"
                position="relative"
                left={edit ? 5 : 0}
              >
                <Stack pr={edit ? 0.8 : 0}>R${personPrice}</Stack>
                {edit && (
                  <IconButton onClick={() => handleRemove(id)}>
                    <DeleteForeverIcon
                      sx={{ color: "#ffd836", fontSize: 20 }}
                    />
                  </IconButton>
                )}
              </Stack>
            }
            sx={{ borderBottom: "1px solid #f5e8b1" }}
            disablePadding
          >
            <ListItemButton
              disabled={!edit}
              onClick={handleToggle(id)}
              dense
              sx={{
                "&.Mui-disabled": {
                  opacity: 1,
                },
              }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={isChecked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  icon={<RadioButtonUncheckedIcon sx={{ color: "#9c8627" }} />}
                  checkedIcon={<CheckCircleIcon sx={{ color: "#ffd836" }} />}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
