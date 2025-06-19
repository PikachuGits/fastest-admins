import allIcons from '@/assets/icon-sets';
import { Iconify, type IconifyName } from '@fastest/components';
import { useSnackbar } from 'notistack';
import './index.css';
import { Box, Grid, Paper, styled } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: '#fff',
  border: '1px solid red',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  // color: (theme.vars ?? theme).palette.text.secondary,
  // ...theme.applyStyles('dark', {
  //   backgroundColor: '#1A2027',
  // }),
}));

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();

  const onClick = (key: IconifyName) => {
    window.navigator.clipboard.writeText(key);
    enqueueSnackbar(`${key}已复制到剪切板`, { variant: 'info' });
  };

  return (
    <div className="container-box">
      {/* <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={4}>123</Grid>
          <Grid size={8}>
            <Item sx={{ height: '100%', boxSizing: 'border-box' }}>Column 2</Item>
          </Grid>
        </Grid>
      </Box> */}
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {Object.keys(allIcons).map(key => (
            <Grid key={key} size={2}>
              <Item>
                <Iconify icon={key as IconifyName} className="text-2xl" />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* // <div key={key} className="icon-item hover:bg-gray-100" onClick={() => onClick(key as IconifyName)}>
           
           // </div> */}
    </div>
  );
};

export default Index;
