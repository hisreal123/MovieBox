import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter, Routes, } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Detail from "./views/Detail";
import Home from "./views/Home";


// import { Provider } from 'react-redux'

// import store from "./redux/store";
// import Nav from "./components/Misc/Nav";


const queryClient = new QueryClient();

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Routes>
//       <Route path="/" element={<User />} />
//       <Route path="/details" element={<Details />} />
//     </Routes>
//   )
// )


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
