const isMobile = num => {
  const isNum = /^[7-9][0-9]{9}/.test(num);
  if (isNum)
    if (num.length === 10) return false;
    else return true;
  else return true;
};
export default isMobile;
