import React, { useState } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
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

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import axios from 'axios';

const mainChartData = getMainChartData();

export default function Dashboard(props) {

  const [predictions, setPredictions] = React.useState(null);
  const [mainChartState, setMainChartState] = useState("monthly");
  React.useEffect(()=>{
    axios.get(`http://127.0.0.1:5000/`)
      .then(response => {
        console.log(response.data["prediction"]);
        setPredictions(response.data["prediction"]);
      })
  }, []);
  // var data = componentDidMount();
  var classes = useStyles();
  var theme = useTheme();
  if (!predictions) {
    return <>Loading</>;
  } else {
    console.log(predictions);
    var PieChartData = [
      { name: "Day 1", value: predictions[1]-predictions[0], color: "primary" },
      { name: "Day 2", value: predictions[2]-predictions[1], color: "secondary" },
      { name: "Day 3", value: predictions[3]-predictions[2], color: "warning" },
      { name: "Day 4", value: predictions[4]-predictions[3], color: "success" },
    ];

    // local

    return (
      <>
        <Grid container spacing={4}>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Widget
              title="Live Total Cases"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
              <div className={classes.visitsNumberContainer}>
                <Grid container item alignItems={"center"}>
                  <Grid item xs={6}>
                    <Typography  variant="h5" weight="low" noWrap>
                    {predictions[0]}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <LineChart
                      width={100}
                      height={30}
                      data={[
                        { value: 10 },
                        { value: 15 },
                        { value: 10 },
                        { value: 17 },
                        { value: 18 },
                      ]}
                    >
                      <Line
                        type="natural"
                        dataKey="value"
                        stroke={theme.palette.success.main}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </Grid>
                </Grid>
              </div>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={4}>
                  <Typography color="text" colorBrightness="secondary" noWrap>
                    Tested
                  </Typography>
                  <Typography size="md">860</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="text" colorBrightness="secondary" noWrap>
                    Deaths
                  </Typography>
                  <Typography size="md">32</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="text" colorBrightness="secondary" noWrap>
                    +ve Rate
                  </Typography>
                  <Typography size="md">0.58%</Typography>
                </Grid>
              </Grid>
            </Widget>
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Widget title="Next Days Prediction" upperTitle className={classes.card}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <ResponsiveContainer width="100%" height={144}>
                    <PieChart>
                      <Pie
                        data={PieChartData}
                        innerRadius={30}
                        outerRadius={50}
                        dataKey="value"
                      >
                        {PieChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={theme.palette[entry.color].main}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.pieChartLegendWrapper}>
                    {PieChartData.map(({ name, value, color }, index) => (
                      <div key={color} className={classes.legendItemContainer}>
                        <Dot color={color} />
                        <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                          &nbsp;{name}&nbsp;
                        </Typography>
                        <Typography color="text" colorBrightness="secondary">
                          &nbsp;{value}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </Grid>
              </Grid>
            </Widget>
          </Grid>
          <Grid item lg={3} md={8} sm={6} xs={12}>
            <Widget
              title="App Performance"
              upperTitle
              className={classes.card}
              bodyClass={classes.fullHeightBody}
            >
              <div className={classes.performanceLegendWrapper}>
                <div className={classes.legendElement}>
                  <Dot color="warning" />
                  <Typography
                    color="text"
                    colorBrightness="secondary"
                    className={classes.legendElementText}
                  >
                    Integration
                  </Typography>
                </div>
                <div className={classes.legendElement}>
                  <Dot color="primary" />
                  <Typography
                    color="text"
                    colorBrightness="secondary"
                    className={classes.legendElementText}
                  >
                    SDK
                  </Typography>
                </div>
              </div>
              <div className={classes.progressSection}>
                <Typography
                  size="md"
                  color="text"
                  colorBrightness="secondary"
                  className={classes.progressSectionTitle}
                >
                  Integration
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={77}
                  classes={{ barColorPrimary: classes.progressBarPrimary }}
                  className={classes.progress}
                />
              </div>
              <div>
                <Typography
                  size="md"
                  color="text"
                  colorBrightness="secondary"
                  className={classes.progressSectionTitle}
                >
                  SDK
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={73}
                  classes={{ barColorPrimary: classes.progressBarWarning }}
                  className={classes.progress}
                />
              </div>
            </Widget>
          </Grid>
          <Grid item lg={3} md={8} sm={6} xs={12}>
            <Widget
              title="Server Overview"
              upperTitle
              className={classes.card}
              bodyClass={classes.fullHeightBody}
            >
              <div className={classes.serverOverviewElement}>
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.serverOverviewElementText}
                  noWrap
                >
                  60% / 37°С / 3.3 Ghz
                </Typography>
                <div className={classes.serverOverviewElementChartWrapper}>
                  <ResponsiveContainer height={50} width="99%">
                    <AreaChart data={getRandomData(10)}>
                      <Area
                        type="natural"
                        dataKey="value"
                        stroke={theme.palette.secondary.main}
                        fill={theme.palette.secondary.light}
                        strokeWidth={2}
                        fillOpacity="0.25"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className={classes.serverOverviewElement}>
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.serverOverviewElementText}
                  noWrap
                >
                  54% / 31°С / 3.3 Ghz
                </Typography>
                <div className={classes.serverOverviewElementChartWrapper}>
                  <ResponsiveContainer height={50} width="99%">
                    <AreaChart data={getRandomData(10)}>
                      <Area
                        type="natural"
                        dataKey="value"
                        stroke={theme.palette.primary.main}
                        fill={theme.palette.primary.light}
                        strokeWidth={2}
                        fillOpacity="0.25"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className={classes.serverOverviewElement}>
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.serverOverviewElementText}
                  noWrap
                >
                  57% / 21°С / 3.3 Ghz
                </Typography>
                <div className={classes.serverOverviewElementChartWrapper}>
                  <ResponsiveContainer height={50} width="99%">
                    <AreaChart data={getRandomData(10)}>
                      <Area
                        type="natural"
                        dataKey="value"
                        stroke={theme.palette.warning.main}
                        fill={theme.palette.warning.light}
                        strokeWidth={2}
                        fillOpacity="0.25"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Widget>
          </Grid>
          
          <Grid item xs={12}>
            <ResponsiveContainer width="100%" minWidth={500} height={750}>
              <iframe src="https://infinitumkiran.github.io/covidcases/" />
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12}>
            <Widget
              bodyClass={classes.mainChartBody}
              header={
                <div className={classes.mainChartHeader}>
                  <Typography
                    variant="h5"
                    color="text"
                    colorBrightness="secondary"
                  >
                    Daily Line Chart
                  </Typography>
                  <div className={classes.mainChartHeaderLabels}>
                    <div className={classes.mainChartHeaderLabel}>
                      <Dot color="warning" />
                      <Typography className={classes.mainChartLegentElement}>
                        Tablet
                      </Typography>
                    </div>
                    <div className={classes.mainChartHeaderLabel}>
                      <Dot color="primary" />
                      <Typography className={classes.mainChartLegentElement}>
                        Mobile
                      </Typography>
                    </div>
                    <div className={classes.mainChartHeaderLabel}>
                      <Dot color="secondary" />
                      <Typography className={classes.mainChartLegentElement}>
                        Desktop
                      </Typography>
                    </div>
                  </div>
                  
                </div>
              }
            >
              <ResponsiveContainer width="100%" minWidth={500} height={350}>
                <ComposedChart
                  margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                  data={mainChartData}
                >
                  <YAxis
                    ticks={[0, 2500, 5000, 7500]}
                    tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                    stroke={theme.palette.text.hint + "80"}
                    tickLine={false}
                  />
                  <XAxis
                    tickFormatter={i => i + 1}
                    tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                    stroke={theme.palette.text.hint + "80"}
                    tickLine={false}
                  />
                  <Area
                    type="natural"
                    dataKey="desktop"
                    fill={theme.palette.background.light}
                    strokeWidth={0}
                    activeDot={false}
                  />
                  <Line
                    type="natural"
                    dataKey="mobile"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                    dot={false}
                    activeDot={false}
                  />
                  <Line
                    type="linear"
                    dataKey="tablet"
                    stroke={theme.palette.warning.main}
                    strokeWidth={2}
                    dot={{
                      stroke: theme.palette.warning.dark,
                      strokeWidth: 2,
                      fill: theme.palette.warning.main,
                    }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Widget>
          </Grid>
          {mock.bigStat.map(stat => (
            <Grid item md={4} sm={6} xs={12} key={stat.product}>
              <BigStat {...stat} />
            </Grid>
          ))}

        </Grid>
      </>
    );
  }
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
