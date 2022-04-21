export default function total(total = 0, action) {
  if (action.type === "updateTotal") {
    const newTotal = action.value;
    return newTotal;
  } else {
    return total;
  }
}
