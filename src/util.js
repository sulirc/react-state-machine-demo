export const postUserAuthData = ({ account, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (account === 'suli' && password === 'qwer1234') {
        resolve({
          msg: "login ok",
          code: 0,
          data: {
            token: `${account}/${password}.${Math.random().toString(32).substring(2)}`,
          },
        });
      } else {
        reject({
          msg: "login fail",
          code: -1,
        });
      }
    }, 1000);
  });
};