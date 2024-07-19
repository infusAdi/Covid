import * as React from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
import { Paper } from "@mui/material";

export default function MapCard({ totalResByCountry, selcountries }) {
  return (
    <Card
      variant="solid"
      color="primary"
      invertedColors
      className="w-4/12 mr-auto ml-auto"
    >
      <CardContent orientation="horizontal">
        <CircularProgress size="lg" determinate value={20}>
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          </SvgIcon>
        </CircularProgress>
        <CardContent>
          <div className="text-center">
            <Typography level="h3">Country Detail Data - {selcountries}</Typography>
          </div>
          <br />

          <Typography sx={{ margin: 1 }} level="h6">
            Confirmed : {totalResByCountry.confirmed}
          </Typography>
          <Typography sx={{ margin: 1 }} level="h6">
            Confirmed Difference : {totalResByCountry.confirmed_diff}
          </Typography>
          <Typography sx={{ margin: 1 }} level="h6">
            Deaths : {totalResByCountry.deaths}
          </Typography>

          <Typography sx={{ margin: 1 }} level="h6">
            Deaths Differnece : {totalResByCountry.deaths_diff}
          </Typography>
          <Typography sx={{ margin: 1 }} level="h6">
            Recovered : {totalResByCountry.recovered}
          </Typography>
          <Typography sx={{ margin: 1 }} level="h6">
            Recovered Difference : {totalResByCountry.recovered_diff}
          </Typography>

          <Typography sx={{ margin: 1 }} level="h6">
            Active : {totalResByCountry.active}
          </Typography>
          <Typography sx={{ margin: 1 }} level="h6">
            Active Difference : {totalResByCountry.active_diff}
          </Typography>
          <Typography sx={{ margin: 1 }} level="h6">
            Fatality Rate{" "}
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
            </SvgIcon>{" "}
            : {totalResByCountry.fatality_rate}
          </Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
}
