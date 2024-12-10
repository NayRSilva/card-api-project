import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import CardsSet from "./components/CardsSet";
const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <>
                <CardsSet />
            </>
        </QueryClientProvider>
    );
}

export default App;
