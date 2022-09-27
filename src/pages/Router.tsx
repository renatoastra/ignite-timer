import { Routes, Route } from "react-router-dom";
import { Home } from "./Home/index";
import { History } from "./History/index";
import { DefaultLayout } from "../layouts/DefaultLayout/index";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="history" element={<History />} />
            </Route>
        </Routes>
    );
}