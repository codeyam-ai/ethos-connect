import { useContext } from 'react';
import ConnectContext from '../components/ConnectContext';

const useEthosConnect = () => {
    return useContext(ConnectContext)
}  

export default useEthosConnect;