"use client";
import { useState } from "react";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/GlobalRedux/store";
import { addListData, editListData } from "@/GlobalRedux/Features/barbecue";
import { Grid, Stack } from "@mui/material";
import {
  CardContainer,
  CardAddContainer,
  DialogView,
  DialogInfo,
} from "@/components";
import { CardData, DialogValues } from "@/interfaces";

export default function Home() {
  const dispatch = useDispatch();
  const barbecueList = useSelector(
    (state: RootState) => state.barbecue.cardList
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState<CardData | null>(null);
  const [editDataDialog, setEditDataDialog] = useState<DialogValues | null>(
    null
  );
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleModalAdd = (data?: CardData, isEdit?: boolean) => {
    setOpenAddDialog(!openAddDialog);
    editDataDialog && setEditDataDialog(null);

    if (data && openAddDialog) {
      dispatch(
        isEdit
          ? editListData(data)
          : addListData({ ...data, id: barbecueList.length + 1 })
      );
    }
  };

  const handleModal = (data: CardData) => {
    if (!openDialog) setDataDialog(data);
    setOpenDialog(!openDialog);
  };

  const handleEdit = () => {
    if (dataDialog) {
      const editValues: DialogValues = {
        id: dataDialog.id ?? 0,
        title: dataDialog.title,
        date: dayjs(dayjs(dataDialog.date, "DD/MM").toDate()),
        participants: dataDialog.participants,
      };

      setEditDataDialog(editValues);
      setOpenDialog(!openDialog);
      setOpenAddDialog(!openAddDialog);
    }
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      mt={-10}
      sx={{ background: "#fafafa" }}
      width="100%"
    >
      <Stack mt={-5}>
        <Grid
          container
          maxWidth={630}
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {barbecueList.map((d, i) => (
            <Grid item xs={12} sm={6} md={6} key={i}>
              <CardContainer data={d} handleModal={handleModal} />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={6}>
            <CardAddContainer handleModalAdd={handleModalAdd} />
          </Grid>
        </Grid>
      </Stack>
      {dataDialog && (
        <DialogView
          data={dataDialog}
          openDialog={openDialog}
          handleModal={handleModal}
          handleEdit={handleEdit}
        />
      )}
      <DialogInfo
        openAddDialog={openAddDialog}
        handleModalAdd={handleModalAdd}
        dataEdit={editDataDialog}
      />
    </Stack>
  );
}
