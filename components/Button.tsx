interface ButtonProps {
    ButtonText: string
}

export default function Button({ButtonText}: ButtonProps) {
    return (
        <button className="p-2 bg-black border text-white rounded-lg hover:border hover:bg-white hover:text-black transition-all">{ButtonText}</button>
    )
}