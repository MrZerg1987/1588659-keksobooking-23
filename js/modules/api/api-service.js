export const getData = (getSuccessHandler, getErrorHandler) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    })
    .then((data) => {
      getSuccessHandler(data);
    })
    .catch(() => {
      getErrorHandler();
    });
};

export const sendData = (sendSuccessHandler, sendErrorHandler, body) => {
  fetch('https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((res) => {
      if (res.ok) {
        sendSuccessHandler();
        return;
      }
      throw new Error();
    })
    .catch(() => {
      sendErrorHandler();
    });
};
