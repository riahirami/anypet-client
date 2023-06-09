import { Grid, Typography } from '@mui/material';
import { Props } from 'Components/AppBar/Appbar.props';
import CustomLink from 'Components/CustomLink/CustomLink';
import { themes } from 'Theme/Themes';
import { Category } from 'core/models/category.model';
import { useGetAllCategoriesQuery } from 'redux/api/categoryApi';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store';
import { setCategories } from 'redux/slices/categorySlice';
import { CustomGlobalGrid } from './Categorie.style';

const Categories: React.FC<Props> = ({
    mode,
    handleThemeChange,
}) => {

    const { data: dataAllCategory, isSuccess } = useGetAllCategoriesQuery(100);

    const categories = useSelector((state: RootState) => state.category);

    const dispatch = useDispatch()

    if (isSuccess) {
        dispatch(setCategories(dataAllCategory));
    }

    return (
        <>
            <CustomGlobalGrid container style={{
                backgroundColor: themes[mode].AdsCard.backgroundColor
            }}>
                <Typography>Categories</Typography>
                {dataAllCategory?.data.map((category: Category) => (
                    <Grid item key={category.id} >
                        <CustomLink to={"/advertise/category/" + category.id}>
                            {category.title}
                        </CustomLink>
                    </Grid>
                ))}
            </CustomGlobalGrid>
        </>)
}

export default Categories