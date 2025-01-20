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

function clusterByCity(data) {
  const cityClusters = {};
  data.forEach((hostel) => {
    const city = hostel.address.split(",")[1]?.trim().toLowerCase();
    if (!cityClusters[city]) {
      cityClusters[city] = [];
    }
    cityClusters[city].push(hostel);
  });
  return cityClusters;
}

function hierarchicalClustering(data, distanceMatrix, threshold) {
  const clusters = data.map((hostel) => [hostel]); // Initially, each hostel is its own cluster

  while (true) {
    let minDistance = Infinity;
    let pairToMerge = null;

    // Find the closest pair of clusters
    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        const distance = calculateClusterDistance(
          clusters[i],
          clusters[j],
          distanceMatrix,
          data
        );
        if (distance < minDistance) {
          minDistance = distance;
          pairToMerge = [i, j];
        }
      }
    }

    // Stop if the closest distance exceeds the threshold
    if (minDistance > threshold) break;

    // Merge the closest pair
    const [i, j] = pairToMerge;
    clusters[i] = clusters[i].concat(clusters[j]);
    clusters.splice(j, 1); // Remove the merged cluster
  }

  return clusters;
}

function calculateClusterDistance(clusterA, clusterB, distanceMatrix, data) {
  let minDistance = Infinity;

  clusterA.forEach((hostelA) => {
    clusterB.forEach((hostelB) => {
      const indexA = data.indexOf(hostelA);
      const indexB = data.indexOf(hostelB);
      const distance = distanceMatrix[indexA][indexB];
      if (distance < minDistance) {
        minDistance = distance;
      }
    });
  });

  return minDistance;
}

exports.getClusters = async (req, res) => {
  try {
    const threshold = parseFloat(req.query.threshold) || 1; // Default threshold = 1 km
    const userLat = parseFloat(req.query.userLat);
    const userLon = parseFloat(req.query.userLon);
    const clusterBy = req.query.clusterBy || "distance"; // Can be "distance" or "address"

    const data = await Shortestpath.find();

    if (data.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    if (clusterBy === "address") {
      const cityClusters = clusterByCity(data);
      return res.json({ clusters: cityClusters });
    } else if (clusterBy === "distance" && userLat && userLon) {
      const distanceMatrix = buildDistanceMatrix(data);
      const clusters = hierarchicalClustering(data, distanceMatrix, threshold);

      // Identify nearest hostels to the user
      const userCluster = data
        .map((hostel) => ({
          hostel,
          distance: haversine(
            userLat,
            userLon,
            hostel.latitude,
            hostel.longitude
          ),
        }))
        .sort((a, b) => a.distance - b.distance);

      return res.json({ clusters, userCluster });
    }

    res.status(400).json({ message: "Invalid clustering option or parameters" });
  } catch (error) {
    console.error("Error in getClusters:", error);
    res.status(500).json({ message: "Error clustering data", error });
  }
};
