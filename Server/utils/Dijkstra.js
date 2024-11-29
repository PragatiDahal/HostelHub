// utils/dijkstra.js
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();

  Object.keys(graph).forEach((node) => {
    distances[node] = node === start ? 0 : Infinity;
  });

  while (visited.size < Object.keys(graph).length) {
    const unvisitedNodes = Object.keys(graph).filter(
      (node) => !visited.has(node)
    );
    const nearestNode = unvisitedNodes.reduce(
      (closest, node) =>
        distances[node] < distances[closest] ? node : closest,
      unvisitedNodes[0]
    );

    visited.add(nearestNode);

    graph[nearestNode].forEach((neighbor) => {
      const newDist = distances[nearestNode] + neighbor.distance;
      if (newDist < distances[neighbor.id]) {
        distances[neighbor.id] = newDist;
      }
    });
  }

  return distances;
}

module.exports = { calculateDistance, dijkstra };
