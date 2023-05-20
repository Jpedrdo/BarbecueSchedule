"use client";
import { forwardRef, ReactElement, Ref } from "react";
import { useDispatch } from "react-redux";
import { deleteListData } from "@/GlobalRedux/Features/barbecue";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  DialogActions,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  openAlert: boolean;
  handleAlert: () => void;
  idToDelete: number;
  handleClose: () => void;
};

export default function AlertSlide({
  openAlert,
  handleAlert,
  idToDelete,
  handleClose,
}: Props) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(deleteListData(idToDelete));
    handleClose();
  };

  return (
    <Dialog
      open={openAlert}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleAlert}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Attention!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this schedule?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleAlert}
          sx={{
            color: "#ffce00",
            fontWeight: "bold",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          No
        </Button>
        <Button
          onClick={handleRemove}
          sx={{
            color: "#ffce00",
            fontWeight: "bold",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
