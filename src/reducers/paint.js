export default function (
  paintData = { volume: 0, coverage: 0, coat: 0 },
  action
) {
  if (action.type === "updateVolume") {
    const newPaintData = {
      volume: action.value,
      coverage: action.paintYield,
      coat: action.coat,
    };

    return newPaintData;
  } else {
    return paintData;
  }
}
