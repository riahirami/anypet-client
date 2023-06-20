import { Grid } from '@mui/material'
import { CategoryListCollapseComponent } from 'Components/ListMenuCollapse/CategoryListCollapseComponent'
import { Advertises } from "Components/Advertises/Advertises";
import ListPartners from "pages/Partner/ListPartner/ListPartners";
import StateListCollapseComponent from "Components/ListMenuCollapse/StateListCollapseComponent";
import { Props } from 'Components/AppBar/Appbar.props';
import { themes } from '../Theme/Themes';
import HeaderCaroussel from 'Components/HeaderCaroussel/HeaderCaroussel';

const Home: React.FC<Props> = ({
  mode,
  handleThemeChange,
}) => {

  return (
    <>
      <Grid container spacing={4}>
        <HeaderCaroussel />
        {/* <Grid item xs={12} sm={12} md={2} lg={2} style={{ minHeight: "auto", marginTop:"32px", backgroundColor: themes[mode].sideBar.backgroundColor }}>
          <CategoryListCollapseComponent mode={mode} handleThemeChange={handleThemeChange} />
          <StateListCollapseComponent mode={mode} handleThemeChange={handleThemeChange} />
        </Grid> */}

          {/* <Categories mode={mode} handleThemeChange={handleThemeChange} /> */}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Advertises mode={mode} handleThemeChange={handleThemeChange} />
        </Grid>
      </Grid>
      <ListPartners />
    </>
  )
}

export default Home