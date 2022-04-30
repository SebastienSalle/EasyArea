export default function paintData(
  paintData = { label:"", volume: 0, coverage: 0, coat: 0 },
  action
) {
  if (action.type === "updateVolume") {
    const newPaintData = {...paintData};
      newPaintData.volume = action.value;
      newPaintData.coverage = action.paintYield;
      newPaintData.coat = action.coat;
      console.log("UPdt ",newPaintData)
//envoyer le label dans le store pour l'imprimer dans le pdf.
    return newPaintData;
  } else if(action.type === "label"){
    const newPaintData = {...paintData};
      newPaintData.label = action.value
    console.log("Lbl ",newPaintData)
    return newPaintData;
  } else {
    return paintData;
  }
}
