"use client";
import {
  Typography,
  CardContent,
  Card,
  Stack,
  CardActionArea,
} from "@mui/material";
import { CardData } from "@/interfaces";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PaidIcon from "@mui/icons-material/Paid";

type Props = {
  data: CardData;
  handleModal: (data: CardData) => void;
};

export default function CardContainer({ data, handleModal }: Props) {
  const { date, title, members, price } = data;

  return (
    <Card variant="outlined" sx={{ width: 290, height: 182 }}>
      <CardActionArea onClick={() => handleModal(data)}>
        <CardContent>
          <Typography fontWeight="900" sx={{ fontSize: 20 }} gutterBottom>
            {date}
          </Typography>
          <Typography
            sx={{ mb: 7, color: "#3d3d3d" }}
            fontWeight="600"
            variant="h5"
            component="div"
          >
            {title || "Without reason"}
          </Typography>
          <Stack direction="row" justifyContent="space-between">
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
