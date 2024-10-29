import {
  Box,
  Button,
  Card,
  Divider,
  Grid2,
  Modal,
  TextField,
} from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import AddLocation from "@mui/icons-material/AddLocationAlt";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const items = [1, 1];

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
});

const Cart = () => {
  const createOrderUsingSelectedAddress = (address) => {};
  const handleOpenAddressModal = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleSubmit = (value) => {
    console.log(value);
  };
  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {items.map((item) => (
            <CartItem />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="front-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>599MAD</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Deliver Fee</p>
                <p>10MAD</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Restaurant charges</p>
                <p>33MAD</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Total pay</p>
              <p>1200MAD</p>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {[1, 1, 1].map((item, index) => (
                <AddressCard
                  key={index}
                  item={item}
                  showButton={true}
                  handleSelectAddress={createOrderUsingSelectedAddress}
                />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocation />
                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg text-white">
                    Add new Address
                  </h1>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleOpenAddressModal}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid2 container spacing={2}>
                <Grid2 item size={{ xs: 12 }}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    error={Boolean(ErrorMessage("streetAddress"))}
                    helperText={
                      <ErrorMessage
                        name="streetAddress"
                        component="span"
                        className="text-red-600"
                      />
                    }
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12 }}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                    error={Boolean(ErrorMessage("state"))}
                    helperText={
                      <ErrorMessage
                        name="state"
                        component="span"
                        className="text-red-600"
                      />
                    }
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12 }}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    error={Boolean(ErrorMessage("city"))}
                    helperText={
                      <ErrorMessage
                        name="city"
                        component="span"
                        className="text-red-600"
                      />
                    }
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12 }}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                    error={Boolean(ErrorMessage("pincode"))}
                    helperText={
                      <ErrorMessage
                        name="pincode"
                        component="span"
                        className="text-red-600"
                      />
                    }
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Deliver here
                  </Button>
                </Grid2>
              </Grid2>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
