const LEGO_INFORMATION = []

export const contextInsertLegoInformation = (port, type) => {
  LEGO_INFORMATION.push({
      "motors": {
        "port": port,
        "type": type
      }
  })
}

export const contextGetLegoInformation = () => {
  return LEGO_INFORMATION.map(x => x)
}
