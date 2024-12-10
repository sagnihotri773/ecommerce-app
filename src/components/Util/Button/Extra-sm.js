export const ExtraSmButton = ({ title, handleClick }) => {
    return (
        <button onClick={() => handleClick()} className="bg-primary mt-2 px-5 py-3 rounded-full flex">
            {title}
        </button>
    )
}