import AddService from "./AddServices"

type Props = {
    isOpen: boolean;
    onClose: () => void
}
export default function Modal({ isOpen, onClose }: Props) {
    if (!isOpen) return null
    
    return (

        <AddService onClose={onClose} />

    )


}