"use client"
export const SmButton = ({ title, handleClick = () => {}  }) => {
  return (
    <button
      className="mt-14 text-lg rounded-full bg-primary text-white w-48 h-10"
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
