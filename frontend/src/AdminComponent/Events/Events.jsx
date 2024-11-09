import React, { useState } from "react";
import { Box, Button, Grid2, Modal, TextField } from "@mui/material";
import Grid from "@mui/material/Grid"; // Use Grid from @mui/material
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Events = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    image: "",
    location: "",
    name: "",
    startedAt: "",
    endedAt: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDateChange = (date, dateType) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [dateType]: dayjs(date).format("MMMM DD, YYYY hh:mm A"),
    }));
  };

  return (
    <div>
      <div className="p-5">
        <Button variant="contained" onClick={handleOpen}>
          Create New Event
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid2 container spacing={3}>
                <Grid2 item size={{ xs: 12 }}>
                  <TextField
                    name="image"
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    value={formValues.image}
                    onChange={handleFormChange}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12 }}>
                  <TextField
                    name="location"
                    label="Location"
                    variant="outlined"
                    fullWidth
                    value={formValues.location}
                    onChange={handleFormChange}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12 }}>
                  <TextField
                    name="name"
                    label="Event Name"
                    variant="outlined"
                    fullWidth
                    value={formValues.name}
                    onChange={handleFormChange}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Start Date and Time"
                      value={
                        formValues.startedAt
                          ? dayjs(formValues.startedAt)
                          : null
                      }
                      onChange={(date) => handleDateChange(date, "startedAt")}
                      sx={{ width: "100%" }}
                      inputFormat="MM/dd/yyyy hh:mm a"
                    />
                  </LocalizationProvider>
                </Grid2>
                <Grid2 item size={{ xs: 12 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="End Date and Time"
                      value={
                        formValues.endedAt ? dayjs(formValues.endedAt) : null
                      }
                      onChange={(date) => handleDateChange(date, "endedAt")}
                      sx={{ width: "100%" }}
                      inputFormat="MM/dd/yyyy hh:mm a"
                    />
                  </LocalizationProvider>
                </Grid2>
                <Grid2 item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Submit
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Events;
