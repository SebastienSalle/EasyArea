export default function paintData(
  paintData = { label: "", volume: 0, coverage: 0, coat: 0 },
  action
) {
  if (action.type === "updateVolume") {
    const newPaintData = { ...paintData };
    newPaintData.volume = action.value;
    newPaintData.coverage = action.paintYield;
    newPaintData.coat = action.coat;
    return newPaintData;
  } else if (action.type === "label") {
    const newPaintData = { ...paintData };
    newPaintData.label = action.value;
    return newPaintData;
  } else {
    return paintData;
  }
}
