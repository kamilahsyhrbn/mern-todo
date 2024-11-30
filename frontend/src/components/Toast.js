import toast from "react-hot-toast";

const showSuccessToast = ({ text }) => {
  toast(text, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      background: "#54b84d",
      color: "#fff",
      textAlign: "center",
    },
  });
};

const showErrorToast = ({ text }) => {
  toast(text, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,

    style: {
      background: "#ff2c2c",
      color: "#fff",
      textAlign: "center",
    },
  });
};

export { showSuccessToast, showErrorToast };
