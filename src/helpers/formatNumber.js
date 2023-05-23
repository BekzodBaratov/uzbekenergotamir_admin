const numberFunction = (number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};





export default numberFunction