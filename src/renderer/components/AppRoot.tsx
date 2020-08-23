import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { HelloReact } from './HelloReact'
import { PingPong } from './PingPong'
import { Clock } from './Clock'
import { AppSettingDialog } from './AppSettingDialog'

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

const AppRoot: React.FC = () => {
    const classes = useStyles()
    const [activeIndex, setActiveIndex] = React.useState<number>(0)

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={activeIndex} onChange={(_e, index) => setActiveIndex(index)} aria-label="simple tabs example">
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <AppSettingDialog></AppSettingDialog>
            {([
                () => <HelloReact></HelloReact>,
                () => <PingPong></PingPong>,
                () => <Clock></Clock>,
            ][activeIndex] || (() => null))()}
        </div>
    )
}

export { AppRoot }