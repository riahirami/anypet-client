import React, { useState } from 'react';
import { Button, Menu, MenuItem,IconButton } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

interface Language {
  code: string;
  name: string;
  flag: React.ReactNode; // Use React.ReactNode for flag icon
}

interface LanguageButtonProps {
  languages: Language[];
  onSelectLanguage: (code: string) => void;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({ languages, onSelectLanguage }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLanguageSelect = (code: string) => {
    setAnchorEl(null);
    onSelectLanguage(code);
  };

  return (
    <div>
    
      <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
      <LanguageIcon />

      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {languages.map((language) => (
          <MenuItem key={language.code} onClick={() => handleLanguageSelect(language.code)}>
            {language.flag} {language.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageButton;
