import axios from "axios";

const getData = async (endpoint) => {
  try {
    return await axios.get(endpoint, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_API_KEY,
      },
    });
  } catch (error) {
    return error.message;
  }
};

export default getData;
