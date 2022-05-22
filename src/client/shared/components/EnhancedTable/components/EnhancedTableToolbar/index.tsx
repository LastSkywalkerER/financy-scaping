import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha, Theme } from '@mui/material/styles';

interface Props {
  numSelected: number;
  customClickPurpose: string;
  name: string;
  handleCustomClick: any;
}

export const EnhancedTableToolbar: React.FC<Props> = (props) => {
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

  const style = {
    pl: { sm: 2 },
    pr: { xs: 1, sm: 1 },
    ...(numSelected > 0 && {
      bgcolor: (theme: Theme) =>
        alpha(
          theme.palette.primary.main,
          theme.palette.action.activatedOpacity,
        ),
    }),
  };

  return (
    <Toolbar sx={style}>
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
};
