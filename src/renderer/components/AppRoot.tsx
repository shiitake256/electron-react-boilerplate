import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { HelloReact } from "./HelloReact";
import { ExampleComponent } from "./ExampleComponent";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function AppRoot() {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveIndex(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={activeIndex}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {(() => {
        const tabPanels = [
          () => <HelloReact></HelloReact>,
          () => <ExampleComponent></ExampleComponent>,
          () => <div>content3</div>,
        ];
        return (tabPanels[activeIndex] || (() => null))();
      })()}
    </div>
  );
}
