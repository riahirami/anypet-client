import React, { useEffect, useState } from "react";
import {
  useDeleteAdMutation,
  useGetAdsQuery,
} from "../../redux/api/adsApi";
import { Ad, AdData } from "../../core/models/ad.model";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Box, Divider,
  InputBase,
  Container, Skeleton, MenuItem, TextField
} from "@mui/material";

import Pagination from "@mui/material/Pagination";
import Spinner from "../Spinner/spinner";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import SearchIcon from "@mui/icons-material/Search";
import useDebounce from "../../CustomHooks/useDebounce";
import { parametersListing } from "../../core/models/parametersListing.model";
import PerPageSelect from "../PerPageChange/PerPageSelect";
import AdCard from "../Card/AdsCard";
import OrderBy from "Components/OrderBy/OrderBy";
import OrderDirection from "Components/OrderDirection/OrderDirection";
import { message } from "core/constant/message"
import AlertComponent from "Components/Alert/Alert";
import { Props } from "Components/AppBar/Appbar.props";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store';
import { getAds } from 'redux/slices/adsSlice';
import { CustomAdsGrid, CustomFilterGrid, CustomGlobalGrid, CustomSearchBox } from "./Advertises.style";
import CardSkeleton from "Components/Skeleton/CardSkeleton";
import { themes } from "Theme/Themes";
import { StateTunisia } from "core/constant/StateTunisia";
import SelectState from "Components/SelectState/SelectState";
import SelectCategory from "Components/SelectCategory/SelectCategory";
import AdVedette from "./AdVedette/AdVedette";

export const Advertises: React.FC<Props> = ({
  mode,
  handleThemeChange,
}) => {
  const [key, setKey] = useState<string | null>("");
  const [value, setValue] = useState<Dayjs | null | string>(dayjs());

  const [selectedPicker, setSelectedPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [parameters, setParameters] = useState<parametersListing>({
    page: 1,
    perPage: "10",
    orderBy: undefined,
    orderDirection: undefined,
    keyword: undefined,
    date: undefined,
    status: ["4","3","2"],
    state: undefined,
    category: undefined,
  });
  const { data, error, isLoading, isSuccess, refetch, isFetching } =
    useGetAdsQuery(parameters);

  const ads = useSelector((state: RootState) => state.ad);

  const dispatch = useDispatch()

  if (isSuccess) {
    dispatch(getAds(data));
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  useEffect(() => {
    setParameters({
      ...parameters,
      keyword: debouncedSearchTerm !== "" ? debouncedSearchTerm : undefined,
    });
  }, [debouncedSearchTerm]);


  const handlePicker = (date: dayjs.Dayjs | null | string) => {
    setSelectedPicker(true);
    const datePicker = dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
    const dateString = datePicker?.substring(0, 10).replace(/-/g, "");
    setParameters({ ...parameters, date: dateString });
  };

  const handleReset = () => {
    setValue("YYYY-DD-MM");
    setParameters({ ...parameters, date: undefined });
  };

  useEffect(() => {
    refetch();
  }, []);


  const handlePageChange = (event: any, page: number) => {
    setParameters({ ...parameters, page });
  };

  const handleFiltreChange = (param: string, value: any) => {
    setParameters((prevParameters) => ({
      ...prevParameters,
      [param]: value,
    }));
  };

  return (

    <CustomGlobalGrid style={{ backgroundColor: themes[mode].advertises.backgroundColor }} >
      <CustomFilterGrid style={{ backgroundColor: themes[mode].filter.backgroundColor }} container justifyContent="space-between" alignItems="center" >
        <Grid item xs={4} sm={4} md={4} lg={3}>
          <CustomSearchBox display="flex" >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search"
              defaultValue={key}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </CustomSearchBox>
        </Grid>

        {/* 
        <Grid item xs={12} sm={4} md={4}>
          <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={value}
                  onChange={(newDate) => handlePicker(newDate)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Button onClick={handleReset} size="medium" variant="contained" style={{ marginBottom: "2px", height: "53px", marginLeft: "5px", marginRight: "5px" }}>
              Reset
            </Button>
          </Box>
        </Grid> */}

        <Grid item xs={8} sm={8} md={8} lg={9} style={{ display: "flex", justifyContent: "flex-end" }}>
          <SelectCategory
            defaultValue={parameters.category}
            value={parameters.category}
            onChange={(value) => handleFiltreChange("category", value)}
          />

          <SelectState
            defaultValue={parameters.state}
            value={parameters.state}
            onChange={(value) => handleFiltreChange("state", value)}
          />

          <PerPageSelect
            defaultValue={parameters.perPage}
            value={parameters.perPage}
            onChange={(value) => handleFiltreChange("perPage", value)}
          />

          <OrderBy
            defaultValue={parameters.orderBy}
            value={parameters.orderBy}
            onChange={(value) => handleFiltreChange("orderBy", value)}
          />

          <OrderDirection
            defaultValue={parameters.orderDirection}
            value={parameters.orderDirection}
            onChange={(value) => handleFiltreChange("orderDirection", value)}
          />
        </Grid>
      </CustomFilterGrid>

      <CustomAdsGrid >
        {isLoading && <Spinner />}

        <Container >
          { }
          <Grid container spacing={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <AdVedette adData={data?.data?.[0]} mode={mode} handleThemeChange={handleThemeChange} />

              </Grid>
              {data?.data.slice(1).map((ad: Ad) => (
                <Grid item key={ad.id} xs={6} sm={6} md={4} lg={3}>
                  {isFetching ? <CardSkeleton /> : <AdCard adData={ad} mode={mode} handleThemeChange={handleThemeChange} />}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      </CustomAdsGrid>

      <Grid container alignItems="center" justifyContent={"space-around"} style={{ margin: "10px" }}>
        <Grid item >
          <Pagination
            color="primary"
            count={data?.last_page}
            defaultPage={parameters.page}
            boundaryCount={1}
            onChange={handlePageChange}
            disabled={isLoading}
          />
        </Grid>

      </Grid>
    </CustomGlobalGrid>

  );
};
