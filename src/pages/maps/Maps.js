import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";
// styles
import useStyles from "./styles";

const BasicMap = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{
        lat: parseFloat(-37.813179),
        lng: parseFloat(144.950259),
      }}
    >
      <Marker position={{ lat: -37.813179, lng: 144.950259 }} />
    </GoogleMap>
  )),
);

export default function Maps() {
  var classes = useStyles();

  return (
    <ResponsiveContainer width="100%" minWidth={500} height={750}>
              <iframe src="http://127.0.0.1:5501/" />
            </ResponsiveContainer>
  );
}
