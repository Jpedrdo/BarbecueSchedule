"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import CreateIcon from "@mui/icons-material/Create";
import { CardData } from "@/interfaces";
import { participantsDataCheckeds } from "@/utils";
import { ParticipantsList } from "@/components";

type Props = {
  data: CardData;
  openDialog: boolean;
  handleModal: (data: CardData) => void;
  handleEdit: () => void;
};

export default function DialogView({
  data,
  openDialog,
  handleModal,
  handleEdit,
}: Props) {
  const { date, title, members, price, participants } = data;
  const [checked, setChecked] = useState<Array<number>>([]);

  const handleClose = () => {
    const newParticipantsData = participantsDataCheckeds(participants, checked);

    handleModal({ ...data, participants: newParticipantsData });
  };

  useEffect(() => {
    if (openDialog) {
      const paids = participants.filter((p) => p.paid).map((p) => p.id);
      setChecked(paids);
    }
  }, [openDialog]);

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          maxHeight: 700,
        },
      }}
    >
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Stack direction="row" alignItems="center">
              <Typography
                pr={0.5}
                fontWeight="900"
                sx={{ fontSize: 20 }}
                gutterBottom
              >
                {date}
              </Typography>
              <Stack position="relative" top={-4}>
                <IconButton onClick={handleEdit}>
                  <CreateIcon sx={{ color: "#ffd836", fontSize: 23 }} />
                </IconButton>
              </Stack>
            </Stack>
            <Typography
              mt={-0.2}
              sx={{ color: "#3d3d3d" }}
              fontWeight="600"
              variant="h5"
              component="div"
            >
              {title || "Without reason"}
            </Typography>
          </Stack>
          <Stack direction="column" justifyContent="space-between">
            <Stack direction="row" alignItems="center">
              <PeopleAltOutlinedIcon sx={{ color: "#ffd836", fontSize: 20 }} />
              <Typography pl={0.5}>{members}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <PaidIcon sx={{ color: "#ffd836", fontSize: 20 }} />
              <Typography pl={0.5} variant="body2">
                ${price}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <ParticipantsList
          participants={participants}
          checked={checked}
          setChecked={setChecked}
        />
      </DialogContent>
    </Dialog>
  );
}
