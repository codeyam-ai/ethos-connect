import { useContext } from 'react';
import ConnectContext from '../components/ConnectContext';

const useContents = () => {
  const contents = useContext(ConnectContext).wallet?.wallet?.contents;

  return contents;
}

export default useContents;