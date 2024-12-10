export const LgButton = ({ title, loading, disable }) => {
  return (
    <button
      type="submit"
      id="submit"
      defaultValue={title}
      className={`py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md w-full ${
        disable ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      disabled={disable}
    >
      {loading ? "Sending" : title}
    </button>
  );
};
