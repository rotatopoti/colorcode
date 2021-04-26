// Color data
import colors from './db'

export default function handler(req, res) {
  // Get data from your database
  res.status(200).json(colors)
}