"use client";
import {
  Typography,
  CardContent,
  Card,
  Stack,
  CardActionArea,
} from "@mui/material";

type Props = {
  handleModalAdd: () => void;
};

export default function CardAddContainer({ handleModalAdd }: Props) {
  return (
    <Stack>
      <Card
        variant="outlined"
        sx={{ background: "#f0f0f0", width: 290, height: 182 }}
      >
        <CardActionArea sx={{ minHeight: 180 }} onClick={handleModalAdd}>
          <CardContent>
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Stack
                width={90}
                height={90}
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundImage: "url(assets/images/addBarbecue.png)",
                  backgroundSize: "cover",
                }}
              />
              <Typography
                sx={{ color: "#3d3d3d", mt: 1 }}
                fontWeight="600"
                variant="h6"
                component="div"
              >
                Add Barbecue
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Stack>
  );
}
