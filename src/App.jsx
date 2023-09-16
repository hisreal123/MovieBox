import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter, Routes, } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Detail from "./views/Detail";
import Home from "./views/Home";


const queryClient = new QueryClient();


export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* <Provider store={store}> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Detail />} />
        </Routes>
        {/* </Provider> */}
      </QueryClientProvider>
      <ToastContainer />
    </BrowserRouter >
  );
}
