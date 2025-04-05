// import React from "react";
// import { AppProps } from "next/app";
// import { Provider } from "react-redux";
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import store from "../store";
// import theme from "../theme/theme";
// import Header from "@/components/header/Header";
// // import '../styles/globals.css';
// // import "../styles/styles.css";

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <Provider store={store}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Header />
//         <Component {...pageProps} />
//       </ThemeProvider>
//     </Provider>
//   );
// }

import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { GlobalStyles } from '@mui/material';
import store from "../store";
import theme from "../theme/theme";
import Header from "@/components/header/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={{
            body: {
              margin: 0,
              padding: 0,
              minHeight: '100vh',
              backgroundImage: 'url("/images/background.webp")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                zIndex: -1,
              }
            }
          }}
        />
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;