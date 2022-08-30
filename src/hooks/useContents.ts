import { useContext } from 'react';
import ContentsContext from '../components/ContentsContext'

const useContents = () => {
  const contents = useContext(ContentsContext);

  return contents;
}

export default useContents;