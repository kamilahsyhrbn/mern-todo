export default function Button({ name }) {
  return (
    <button
      type="submit"
      className="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-xl text-sm px-5 py-2.5 text-center mt-3"
    >
      {name}
    </button>
  );
}
