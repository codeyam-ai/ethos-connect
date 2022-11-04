import { useContext } from "react"
import ModalContext from "../components/ModalContext";

const useModal = () => {
    const {isModalOpen, setIsModalOpen} = useContext(ModalContext)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return { openModal, closeModal, isModalOpen }
}

export default useModal;