import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { HelloReact } from './HelloReact'
import { PingPong } from './PingPong'
import { Clock } from './Clock'
// import { HelloReact2 } from "./HelloReact2";
// import { HelloReact3 } from "./HelloReact3";

interface TabPanelProps {
    children?: React.ReactNode
    index: unknown
    value: unknown
}

function a11yProps(index: unknown) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}))

export function AppRoot() {
    const classes = useStyles()
    const [activeIndex, setActiveIndex] = React.useState<number>(0)

    const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
        setActiveIndex(newValue)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={activeIndex} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            {(() => {
                const tabPanels = [
                    () => <HelloReact></HelloReact>,
                    () => <PingPong></PingPong>,
                    () => <Clock></Clock>,
                ]
                return (tabPanels[activeIndex] || (() => null))()
            })()}
        </div>
    )
}
