import { useEffect, useState } from "react";
import { Theme } from "../core/enums/theme";

const useTheme = () => {
    const [mode, setMode] = useState<Theme>(Theme.LIGHT);

    const handleThemeChange = () => {
        setMode(mode === Theme.DARK ? Theme.LIGHT : Theme.DARK)
        localStorage.setItem("theme", mode);
    };


    useEffect(() => {
        const theme = localStorage.getItem('theme');
        setMode(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
    }, []);

    return {
        mode,
        handleThemeChange,
    }

}
export default useTheme