import RootLayout from "./components/RootLayout"
import AuthPage from "./pages/AuthPage";
import GoalPage from "./pages/GoalPage";
import EntryPage from "./pages/EntryPage";

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/goal" element={<GoalPage />} />
            <Route path="/entry" element={<EntryPage />} />
        </Route>
    )
)

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App