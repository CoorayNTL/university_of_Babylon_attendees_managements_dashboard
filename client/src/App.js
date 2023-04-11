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
                                element={<Navigate to="/dashboard" replace />}
                            />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/feedBacks" element={<FeedBacks />} />
                            <Route path="/attendees" element={<Attendees />} />
                            <Route
                                path="/dataFinalists"
                                element={<DataFinalists />}
                            />
                            <Route path="/overview" element={<Overview />} />
                            <Route path="/daily" element={<Daily />} />
                            <Route path="/monthly" element={<Monthly />} />
                            <Route path="/breakdown" element={<Breakdown />} />
                            <Route path="/rsvpemail" element={<RSVPEMAIL />} />
                            <Route
                                path="/administrator"
                                element={<Administrator />}
                            />
                            <Route
                                path="/attendeeStatus"
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
