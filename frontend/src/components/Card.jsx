export default function Card({ todo, isDone, onDone, onDelete }) {
  return (
    <div className="bg-[#11192D] p-5 rounded-lg flex flex-row items-center justify-between">
      <h1
        className={`${
          isDone === true ? "line-through text-[#7ABF98]" : "text-primary"
        } `}
      >
        {todo}
      </h1>
      {isDone === false ? (
        <div className="flex gap-3">
          <button onClick={onDone}>
            <svg
              fill="#B08968"
              viewBox="0 0 24 24"
              id="check"
              data-name="Flat Color"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 hover:fill-[#7ABF98]"
            >
              <path
                id="primary"
                d="M10,18a1,1,0,0,1-.71-.29l-5-5a1,1,0,0,1,1.42-1.42L10,15.59l8.29-8.3a1,1,0,1,1,1.42,1.42l-9,9A1,1,0,0,1,10,18Z"
              ></path>
            </svg>
          </button>
          <button onClick={onDelete}>
            <svg
              className="w-5 h-5 hover:fill-red-600"
              viewBox="0 0 15 15"
              fill="#B08968"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
              />
            </svg>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
