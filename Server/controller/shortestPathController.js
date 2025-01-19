//controller/shortestPathController.js
const Shortestpath = require("../models/Shortestpath");

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in km
  const toRadians = (deg) => (deg * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function buildDistanceMatrix(data) {
  const distanceMatrix = Array(data.length)
    .fill(0)
    .map(() => Array(data.length).fill(0));

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (i !== j) {
        distanceMatrix[i][j] = haversine(
          data[i].latitude,
          data[i].longitude,
          data[j].latitude,
          data[j].longitude
        );
      }
    }
  }

  return distanceMatrix;
}

function hierarchicalClustering(data, distanceMatrix, threshold) {
  const clusters = data.map((_, index) => [index]);

  while (true) {
    let minDist = Infinity;
    let mergeA = -1,
      mergeB = -1;

    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        let dist = calculateClusterDistance(
          clusters[i],
          clusters[j],
          distanceMatrix
        );
        if (dist < minDist) {
          minDist = dist;
          mergeA = i;
          mergeB = j;
        }
      }
    }

    if (minDist > threshold) break;

    clusters[mergeA] = clusters[mergeA].concat(clusters[mergeB]);
    clusters.splice(mergeB, 1);
  }

  return clusters.map((cluster) => cluster.map((idx) => data[idx]));
}

function calculateClusterDistance(clusterA, clusterB, distanceMatrix) {
  let totalDist = 0;
  let count = 0;

  for (const pointA of clusterA) {
    for (const pointB of clusterB) {
      totalDist += distanceMatrix[pointA][pointB];
      count++;
    }
  }

  return totalDist / count;
}

exports.getClusters = async (req, res) => {
  try {
    const threshold = parseFloat(req.query.threshold) || 5;
    const data = await Shortestpath.find();

    if (data.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const distanceMatrix = buildDistanceMatrix(data);
    const clusters = hierarchicalClustering(data, distanceMatrix, threshold);

    res.json({ clusters });
  } catch (error) {
    console.error("Error in getClusters:", error);
    res.status(500).json({ message: "Error clustering data", error });
  }
};
