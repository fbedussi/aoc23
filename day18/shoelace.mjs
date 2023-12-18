export const polygonArea = (vertices) => {
  //A function to apply the Shoelace algorithm
  const numberOfVertices = vertices.length
  let sum1 = 0
  let sum2 = 0
  
  for (let i = 0; i < numberOfVertices - 1; i++) {
    sum1 = sum1 + vertices[i][0] *  vertices[i+1][1]
    sum2 = sum2 + vertices[i][1] *  vertices[i+1][0]
  }
  
  //Add xn.y1
  sum1 = sum1 + vertices[numberOfVertices-1][0]*vertices[0][1]   
  //Add x1.yn
  sum2 = sum2 + vertices[0][0]*vertices[numberOfVertices-1][1]   
  
  const area = Math.abs(sum1 - sum2) / 2
  return area
}
