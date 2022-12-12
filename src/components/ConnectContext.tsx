import { createContext } from 'react';
import { ConnectContextContents } from '../types/ConnectContextContents';

const defaultContents: ConnectContextContents = {
    ethosConfiguration: {}
}

const ConnectContext = createContext(defaultContents);

export default ConnectContext;