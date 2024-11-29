const { calculateDistance, dijkstra } = require('./utils/Dijkstra');
const hostels = require('./data/shortestpath.json'); // Update path as needed

// Convert hostel data to a graph for Dijkstra
const buildGraph = () => {
  const graph = {};
  hostels.forEach((hostel) => {
    graph[hostel.name] = hostels.map((otherHostel) => ({
      id: otherHostel.name,
      distance: calculateDistance(
        hostel.latitude,
        hostel.longitude,
        otherHostel.latitude,
        otherHostel.longitude
      ),
    }));
  });
  return graph;
};

const findShortestPath = (req, res) => {
  const { latitude, longitude } = req.body;
  const userNode = { id: 'user', latitude, longitude };

  // Add user as a node in the graph
  const graph = buildGraph();
  graph[userNode.id] = hostels.map((hostel) => ({
    id: hostel.name,
    distance: calculateDistance(
      latitude,
      longitude,
      hostel.latitude,
      hostel.longitude
    ),
  }));

  // Calculate shortest distances
  const distances = dijkstra(graph, userNode.id);

  // Find the nearest hostel
  const nearestHostel = Object.keys(distances)
    .filter((id) => id !== 'user')
    .reduce((nearest, id) =>
      distances[id] < distances[nearest] ? id : nearest
    );

  // Return path from user to nearest hostel
  const path = [
    { latitude, longitude },
    ...hostels
      .filter((hostel) => hostel.name === nearestHostel)
      .map(({ latitude, longitude }) => ({ latitude, longitude })),
  ];

  res.json(path);
};

module.exports = { findShortestPath };
