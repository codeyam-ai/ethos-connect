import { createContext } from 'react';

// type ModalContextProps = {
//     isModalOpen: boolean,
//     setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
// }

const defaultIsModalOpen: any | null = null

const ModalContext = createContext(defaultIsModalOpen);

export default ModalContext;