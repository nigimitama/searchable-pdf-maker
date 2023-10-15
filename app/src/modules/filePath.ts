import fs = require("fs")
import path = require("path")


const isDirectory = (inputPath: string): boolean => {
  const stats = fs.statSync(inputPath)
  return stats.isDirectory()
}


const getChildren = (dirPath: string): Array<string> => {
  let filePath = ''
  const filePaths = []
  const files = fs.readdirSync(dirPath, { recursive: true })
  for (const file of files) {
    filePath = path.join(dirPath, file)
    if (!isDirectory(filePath)) filePaths.push(filePath)
  }
  return filePaths
}


export const parseFilePaths = (inputPath: string): string[] => {
  const result = isDirectory(inputPath) ? getChildren(inputPath) : [inputPath]
  console.log(`[parseFilePaths] result=${result}`)
  return result
}