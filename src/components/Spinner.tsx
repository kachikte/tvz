// Spinner.js
import { ClipLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
      <ClipLoader color="#09f" size={50} />
    </div>
  );
};

export default Spinner;
