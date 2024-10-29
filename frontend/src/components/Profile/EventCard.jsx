import { Delete } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

const EventCard = () => {
  return (
    <div>
      <Card sx={{ width: 330 }}>
        <CardMedia
          sx={{ height: 345 }}
          image="https://images.pexels.com/photos/2116094/pexels-photo-2116094.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        <CardContent>
          <Typography variant="h5">Moroccan Fast Food</Typography>
          <Typography variant="body2">50% on your first order</Typography>
          <div className="py-2 space-y-2">
            <p>{"Kenitra"}</p>
            <p className="text-sm text-blue-500">October 28, 2024 12:00 AM</p>
            <p className="text-sm text-red-500">October 31, 2024 12:00 AM</p>
          </div>
        </CardContent>
        {false && (
          <CardActions>
            <IconButton>
              <Delete />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
