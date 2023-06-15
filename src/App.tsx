import React from 'react';
import './App.css';
import { Footer } from './Components/Footer/Footer';
import useTheme from "./CustomHooks/useTheme";
import { ResponsiveAppBar } from './Components/AppBar/Appbar';
import { ContainerComponent } from './Components/Container/ContainerComponent';
import AuthGuard from 'Components/AuthGuard/AuthGuard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AdDetails from 'pages/Advertises/AdDetails';
import Signin from 'pages/Signin/signin';
function App() {
  const { mode, handleThemeChange } = useTheme();


  return (
    <div className="App">

      <AuthGuard>
        <ResponsiveAppBar mode={mode} handleThemeChange={handleThemeChange} />
        <ContainerComponent mode={mode} handleThemeChange={handleThemeChange} />
        <Footer mode={mode} handleThemeChange={handleThemeChange} />
      </AuthGuard>


    </div>
  );
}

export default App;
