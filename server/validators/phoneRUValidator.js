module.exports = (phone) => {
  if (!phone) {
    return;
  }

  let validPhone = '';
  for (let i = 0; i < phone.length; i++) {
    if (
      typeof Number(phone[i]) === 'number' &&
      !isNaN(Number(phone[i])) &&
      phone[i] !== ' '
    ) {
      validPhone += String(phone[i]);
    }
  }
  if (validPhone[0] === '7' || validPhone[0] === '8') {
    validPhone = validPhone.substring(1, validPhone.length);
  }

  return validPhone;
};
