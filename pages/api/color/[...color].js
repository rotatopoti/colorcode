import colors from '../db'

function chooseElement(colorName) {
  return colors.find( element => element.color === colorName)
}

function calculateResults (color) {
  let tolerance = Number(chooseElement(color[0]).percent)
  let firstSigFig =  (chooseElement(color[1]).significantFigures)
  let secondSigFig = (chooseElement(color[2]).significantFigures)
  let multiplier = (chooseElement(color[3]).multiplier)

  let firstTwoNumbers = String(firstSigFig) + String(secondSigFig)
  let resistance = Number(firstTwoNumbers) * Number(multiplier)
  console.log
  let maximum = resistance + resistance*(tolerance/100)
  let minimum = resistance - resistance*(tolerance/100)

  let results = { resistance: resistance, tolerance: tolerance, maximum: maximum, minimum: minimum }

  return results;

}

export default function colorHandler(req, res) {
    const {
      query: { color },
      method,
    } = req
  
    switch (method) {
      case 'GET':
        // Get data from database
        console.log('getting color', color)
        let result = calculateResults(color)
        console.log('Result', result)
        res.status(200).json(result)
        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }