import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

export default function EnhancedTableToolbar(props) {
  const { numSelected, customClickPurpose, name, handleCustomClick } = props;

  let CustomIcon = AddBoxIcon;

  switch (customClickPurpose) {
    case 'Buy':
      CustomIcon = AddBoxIcon;
      break;
    case 'Delete':
      CustomIcon = DeleteIcon;
      break;
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {name}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title={customClickPurpose}>
          <IconButton onClick={handleCustomClick}>
            <CustomIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}
