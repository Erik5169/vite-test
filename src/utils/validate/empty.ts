exports.notEmpty = (name: string) => {
  return (v: string) => {
    if (!v || v.trim() === '') {
      return `${name} is required`;
    } else {
      return true;
    }
  };
};
