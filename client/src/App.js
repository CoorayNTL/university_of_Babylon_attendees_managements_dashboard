import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import FeedBacks from "scenes/feedBacks";
import Attendees from "scenes/attendees";
import DataFinalists from "scenes/dataFinalists";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import RSVPEMAIL from "scenes/revpemail";
import Administrator from "scenes/administrator";
import AttendeeStatus from "scenes/attendeeStatus";

function App() {
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route element={<Layout />}>
                            <Route
                                path="/"
                                element={<Navigate to="/attendeemanager/dashboard" replace />}
                            />
                            <Route path="/attendeemanager/dashboard" element={<Dashboard />} />
                            <Route path="/attendeemanager/feedBacks" element={<FeedBacks />} />
                            <Route path="/attendeemanager/attendees" element={<Attendees />} />
                            <Route
                                path="/attendeemanager/dataFinalists"
                                element={<DataFinalists />}
                            />
                            <Route path="/attendeemanager/overview" element={<Overview />} />
                            <Route path="/attendeemanager/daily" element={<Daily />} />
                            <Route path="/attendeemanager/monthly" element={<Monthly />} />
                            <Route path="/attendeemanager/breakdown" element={<Breakdown />} />
                            <Route path="/attendeemanager/rsvpemail" element={<RSVPEMAIL />} />
                            <Route
                                path="/attendeemanager/administrator"
                                element={<Administrator />}
                            />
                            <Route
                                path="/attendeemanager/attendeeStatus"
                                element={<AttendeeStatus />}
                            />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
