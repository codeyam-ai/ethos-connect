import { useContext } from "react"
import ModalContext from "../components/ModalContext";

const useModal = () => {
    const {isModalOpen, setIsModalOpen} = useContext(ModalContext)

    const openModal = () => {
        setIsModalOpen(true)
        // Lock scroll
        document.getElementsByTagName('html').item(0)?.setAttribute('style', 'overflow: hidden;')
    }

    const closeModal = () => {
        setIsModalOpen(false)
        // Return scroll to normal
        document.getElementsByTagName('html').item(0)?.setAttribute('style', '')
    }

    return { openModal, closeModal, isModalOpen }
}

export default useModal;