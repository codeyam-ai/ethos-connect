import { createContext } from 'react';

const defaultContents: any|null = {}

const ContentsContext = createContext(defaultContents);

export default ContentsContext;