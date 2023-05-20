"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Stack,
  Button,
  Box,
  TextField,
  Fab,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CardData, DialogValues } from "@/interfaces";
import { initDialogValues, participantsDataCheckeds } from "@/utils";
import { ParticipantsList, AlertSlide } from "@/components";

type Props = {
  openAddDialog: boolean;
  handleModalAdd: (data?: CardData, isEdit?: boolean) => void;
  dataEdit: DialogValues | null;
};

type handleChangeType =
  | Dayjs
  | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  | null;

export default function DialogInfo({
  openAddDialog,
  handleModalAdd,
  dataEdit,
}: Props) {
  const [checked, setChecked] = useState<Array<number>>([]);
  const [values, setValues] = useState<DialogValues>(initDialogValues);
  const [openAlert, setOpenAlert] = useState(false);

  const handleCleanStuffs = () => {
    setTimeout(() => {
      setValues(initDialogValues);
      setChecked([]);
    }, 2.5 * 100);
  };

  const handleChange = (event: handleChangeType) => {
    if (event) {
      const newValue =
        "target" in event
          ? { [event.target.name]: event.target.value }
          : { date: event };

      setValues({
        ...values,
        ...newValue,
      });
    }
  };

  const handleList = () => {
    const newParticipantsList = [
      ...values.participants,
      {
        id: values.participants.length + 1,
        name: values.currentName ?? "",
        paid: false,
        personPrice: Number(values.currentPrice),
      },
    ];

    setValues({
      ...values,
      participants: newParticipantsList,
      currentName: "",
      currentPrice: "",
    });
  };

  const handleRemovePart = (id: number) => {
    const cleanData = values.participants.filter((e) => e.id !== id);
    setValues({
      ...values,
      participants: cleanData,
    });
  };

  const handleSave = () => {
    const totalPrice = values.participants.reduce((total, participant) => {
      return total + participant.personPrice;
    }, 0);
    const dateFormat =
      values.date && typeof values.date !== "string"
        ? values.date.format("DD/MM")
        : "";
    const newParticipantsData = participantsDataCheckeds(
      values.participants,
      checked
    );

    const newBarbecueData = {
      id: values.id,
      date: dateFormat,
      title: values.title,
      members: values.participants.length,
      price: totalPrice,
      participants: newParticipantsData,
    };

    handleCleanStuffs();
    handleModalAdd(newBarbecueData, !!dataEdit);
  };

  const handleClose = () => {
    handleModalAdd();
    setOpenAlert(false);
    handleCleanStuffs();
  };

  const handleAlert = () => setOpenAlert(!openAlert);

  useEffect(() => {
    if (dataEdit) {
      const paids = dataEdit.participants
        .filter((p) => p.paid)
        .map((p) => p.id);

      setChecked(paids);
      setValues(dataEdit);
    }
  }, [dataEdit]);

  return (
    <Dialog
      open={openAddDialog}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          maxHeight: 900,
        },
      }}
    >
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography
              sx={{ color: "#3d3d3d" }}
              fontWeight="600"
              variant="h5"
              component="div"
              pt={0.5}
            >
              {dataEdit ? "Edit" : "Add"} Barbecue
            </Typography>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack
          direction="column"
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
        >
          <Box fontWeight="bold">Title</Box>
          <TextField
            name="title"
            placeholder="Title"
            variant="outlined"
            type="text"
            inputProps={{ maxLength: 18 }}
            value={values.title}
            onChange={handleChange}
          />
          <Box pt={2} fontWeight="bold">
            Date*
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["month", "day"]}
              format="DD/MM"
              minDate={dayjs()}
              maxDate={dayjs("2023-12-31")}
              value={values.date}
              onChange={handleChange}
            />
          </LocalizationProvider>
          <Box pt={2} fontWeight="bold">
            Add Participants*
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Box fontWeight="bold" pb={1.5}>
                Name
              </Box>
              <TextField
                fullWidth
                name="currentName"
                placeholder="Name"
                variant="outlined"
                type="text"
                inputProps={{ maxLength: 16 }}
                value={values.currentName ?? ""}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <Box fontWeight="bold" pb={1.5}>
                Price
              </Box>
              <TextField
                fullWidth
                name="currentPrice"
                placeholder="Price"
                variant="outlined"
                type="number"
                inputProps={{ maxLength: 16 }}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                value={values.currentPrice ?? ""}
                onChange={handleChange}
              />
            </Box>
            <Box pl={0.2} pt={4}>
              <Fab
                color="primary"
                aria-label="add"
                disabled={!(!!values.currentName && !!values.currentPrice)}
                style={{
                  backgroundColor: "#ffd836",
                  opacity: !(!!values.currentName && !!values.currentPrice)
                    ? 0.5
                    : 1,
                }}
                onClick={handleList}
              >
                <AddIcon />
              </Fab>
            </Box>
          </Stack>
          {values.participants.length ? (
            <Box sx={{ maxHeight: 280, overflow: "auto" }}>
              <ParticipantsList
                participants={values.participants}
                checked={checked}
                setChecked={setChecked}
                handleRemovePart={handleRemovePart}
                edit={true}
              />
            </Box>
          ) : null}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack p={2} direction="row">
          {dataEdit && (
            <Box pr={2.5}>
              <Button
                autoFocus
                onClick={handleAlert}
                variant="outlined"
                color="error"
              >
                Delete
              </Button>
            </Box>
          )}
          <Button
            autoFocus
            onClick={handleSave}
            variant="outlined"
            sx={{
              color: "#ffce00",
              fontWeight: "bold",
              "&:hover": {
                opacity: 0.8,
                borderColor: "#e1ba14",
                color: "#e1ba14",
              },
              borderColor: "#ffce00",
            }}
            disabled={!(!!values.date && !!values.participants.length)}
          >
            Save
          </Button>
        </Stack>
      </DialogActions>
      {dataEdit && (
        <AlertSlide
          openAlert={openAlert}
          handleAlert={handleAlert}
          idToDelete={dataEdit.id}
          handleClose={handleClose}
        />
      )}
    </Dialog>
  );
}
