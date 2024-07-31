import RootLayout from "./components/RootLayout"
import AuthPage from "./pages/AuthPage";
import GoalPage from "./pages/GoalPage";
import EntryPage from "./pages/EntryPage";

import { useToast } from "@chakra-ui/react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


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
    const toast = useToast({
        position: "top-right",
        duration: 2500,
        isClosable: true,
    })

    const queryClient = new QueryClient({
        queryCache: new QueryCache({
            onError: (e) => toast({
                status: "error", description: e.response.data.message
            })
        }),
        mutationCache: new MutationCache({
            onSuccess: (res) => toast({
                status: "success", description: res.data.message
            }),
            onError: (e) => toast({
                status: "error", description: e.response.data.message
            })
        })
    })

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App