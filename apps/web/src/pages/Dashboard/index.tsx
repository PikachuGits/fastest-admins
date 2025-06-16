import allIcons from '@/assets/icon-sets';
import { Iconify, type IconifyName } from '@fastest/components';
import { useSnackbar } from 'notistack';
import './index.css';

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();

  const onClick = (key: IconifyName) => {
    window.navigator.clipboard.writeText(key);
    enqueueSnackbar(`${key}已复制到剪切板`, { variant: 'info' });
  };

  return (
    <div className="container-box">
      {Object.keys(allIcons).map(key => {
        return (
          <div key={key} className="icon-item hover:bg-gray-100" onClick={() => onClick(key as IconifyName)}>
            <Iconify icon={key as IconifyName} className="text-2xl" />
          </div>
        );
      })}
    </div>
  );
};

export default Index;
