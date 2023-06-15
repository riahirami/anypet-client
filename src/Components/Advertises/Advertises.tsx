import React, { useEffect, useState } from "react";
import {
  useDeleteAdMutation,
  useGetAdsQuery,
  useGetMediaByIdQuery,
  useListFavoriteQuery,
} from "../../redux/api/adsApi";
import { Ad, AdData } from "../../core/models/ad.model";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Box,
  InputBase,
  Container, Skeleton
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
import { CustomGlobalGrid } from "./Advertises.style";
import CardSkeleton from "Components/Skeleton/CardSkeleton";
import { themes } from "Theme/Themes";

export const Advertises: React.FC<Props> = ({
  mode,
  handleThemeChange,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState<string | null>("");
  const [value, setValue] = useState<Dayjs | null | string>(dayjs());

  const [selectedPicker, setSelectedPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [parameters, setParameters] = useState<parametersListing>({
    page: 1,
    perPage: "12",
    orderBy: undefined,
    orderDirection: undefined,
    keyword: undefined,
    date: undefined,
    status: "2",
    state: undefined,
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

  const handlePageChange = (event: any, page: number) => {
    setParameters({ ...parameters, page });
  };

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

  const handlePerPageChange = (perPage: any) => {
    setParameters({ ...parameters, perPage });
  };
  const handleOrderByChange = (orderBy: any) => {
    setParameters({ ...parameters, orderBy });
  };

  const handleOrderDirectionChange = (orderDirection: any) => {
    setParameters({ ...parameters, orderDirection });
  };

  const handleParameterChange = (param: string, value: any) => {
    setParameters({ ...parameters, [param]: value });
  };



  return (

    <CustomGlobalGrid  style={{ backgroundColor: themes[mode].advertises.backgroundColor, padding:"20px" }} >

      <Grid container justifyContent="space-between" alignItems="center" sx={{mb:10}}>
        <Grid item xs={4} sm={4} md={4} lg={3}>
          <Box display="flex" borderRadius="3px" style={{ border: "1px solid grey", marginLeft:'15px' }}>
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
          </Box>
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
          <PerPageSelect
            defaultValue={parameters.perPage}
            value={parameters.perPage}
            onChange={handlePerPageChange}
          />
          <OrderBy
            defaultValue={parameters.orderBy}
            value={parameters.orderBy}
            onChange={handleOrderByChange}
          />
          <OrderDirection
            defaultValue={parameters.orderDirection}
            value={parameters.orderDirection}
            onChange={handleOrderDirectionChange}
          />
        </Grid>
      </Grid>


      <Grid>
        {isLoading && <Spinner />}

        <Container>
          { }

          <Grid container spacing={1}>
            <Grid container spacing={2}>
              {data?.data.map((ad: Ad) => (
                <Grid item key={ad.id} xs={6} sm={6} md={4} lg={3}>
                  {isFetching ? <CardSkeleton />
                    : <AdCard adData={ad} mode={mode} handleThemeChange={handleThemeChange} />}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Grid>

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
