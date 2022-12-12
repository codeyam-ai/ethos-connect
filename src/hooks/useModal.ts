import { useContext } from "react"
import ConnectContext from '../components/ConnectContext';

const useModal = () => {
    const { modal } = useContext(ConnectContext)

    return modal
}

export default useModal;