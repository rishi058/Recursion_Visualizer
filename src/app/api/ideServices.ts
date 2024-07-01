import axios from "axios";
import toast from "react-hot-toast";

var myKey = "f8ae960b3emsh008a9590e93f181p10e969jsnb1d7d8fbb41f";
var oldKey = "b4e5c5a05fmsh9adf6ec091523f8p165338jsncc58f31c26e1";

export const postSubmission = async (
  language_id: number,
  source_code: string,
  stdin: string
) => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": myKey,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: JSON.stringify({
      language_id: language_id,
      source_code: source_code,
      stdin: stdin,
      cpu_time_limit: 15, // bottom 4 are set to max values
      wall_time_limit: 20,
      memory_limit: 512000,
      stack_limit: 128000,
    }),
  };

  try {
    const res = await axios.request(options);

    if (res.status >= 300) {
      toast.error(`Error: ${res.status} - ${res.statusText}`);
      return;
    }

    if (res.data && res.data.token) {
      return res.data.token;     // only valid response
    } else {
      toast.error("Unexpected response format.");
      return;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`Request error: ${error.message}`);
    } else {
      toast.error(`Unexpected error: ${error}`);
    }
  }
};

export const getOutput = async (token: string): Promise<any> => {

  if (!token) {
    toast.error("Token is required.");
    return;
  }

  const options = {
    method: "GET",
    url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "X-RapidAPI-Key": myKey,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  // call the api

  try {
    const res = await axios.request(options);

    if (res.status >= 300) {
      toast.error(`Error: ${res.status} - ${res.statusText}`);
      return;
    }

    if (res.data && res.data.status_id <= 2) {
      // If the status_id indicates that the result is not ready, retry after a delay
      await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second before retrying
      const res2 = await getOutput(token);
      return res2;
    }

    return res.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`Request error: ${error.message}`);
    } else {
      toast.error(`Unexpected error: ${error}`);
    }
  }
};
