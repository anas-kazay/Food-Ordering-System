import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, Grid2 } from "@mui/material";
import React from "react";

const RestaurantDetails = () => {
  const handleRestaurantStatus = () => {};
  return (
    <div className="lg:px-20 px-5 pb-10">
      <div className="py-5 flex justify-center items-center gap-5">
        <h1 className="text-2xl lg:text-6xl text-center font-bold p-5">
          Moroccan Fast Food
        </h1>
        <Button
          className="py-[1rem] px-[2rem]"
          color={true ? "error" : "primary"}
          onClick={handleRestaurantStatus}
          size="large"
          variant="contained"
        >
          {true ? "close" : "open"}
        </Button>
      </div>
      <Grid2 container spacing={2}>
        <Grid2 item size={{ xs: 12 }}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300">Address</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Owner</p>
                  <p className="text-gray-400">
                    <span className="pr-5"> - </span>
                    Anas KAZAY
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Restaurant Name</p>
                  <p className="text-gray-400">
                    <span className="pr-5"> - </span>
                    Anas KAZAY
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Cuisine Type</p>
                  <p className="text-gray-400">
                    <span className="pr-5"> - </span>
                    Anas KAZAY
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Opening Hours</p>
                  <p className="text-gray-400">
                    <span className="pr-5"> - </span>
                    Anas KAZAY
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Status</p>
                  <p className="text-gray-400">
                    <span className="pr-5"> - </span>
                    {false ? (
                      <span className="px-5 py-2 rounded-full bg-green-400 text-gray-900">
                        Open
                      </span>
                    ) : (
                      <span className="px-5 py-2 rounded-full bg-red-400 text-gray-900">
                        Closed
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 item size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300">Address</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Country</p>
                  <p className="text-gray-400">
                    <span className="pr-5"> - </span>
                    Anas KAZAY
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">City</p>
                  <p className="text-gray-400">
                    <span className="pr-5"> - </span>
                    Anas KAZAY
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Postal Code</p>
                  <p className="text-gray-400">
                    <span className="pr-5"> - </span>
                    Anas KAZAY
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Street Address</p>
                  <p className="text-gray-400">
                    <span className="pr-5"> - </span>
                    Anas KAZAY
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 item size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300">Contact</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Email</p>
                  <p className="text-gray-400">
                    <span className="pr-5"> - </span>
                    Anas KAZAY
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Mobile</p>
                  <p className="text-gray-400">
                    <span className="pr-5"> - </span>
                    Anas KAZAY
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Social</p>
                  <div className="flex text-gray-400 items-center pb-3 gap-2">
                    <span className="pr-5">-</span>
                    <a href="/">
                      <Instagram sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href="/">
                      <Twitter sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href="/">
                      <LinkedIn sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href="/">
                      <Facebook sx={{ fontSize: "3rem" }} />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default RestaurantDetails;
