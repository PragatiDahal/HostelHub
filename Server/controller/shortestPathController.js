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

// Function to calculate the distance between two points
function haversineDistance(lat1, lon1, lat2, lon2) {
  return haversine(lat1, lon1, lat2, lon2); // Use the existing haversine function
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

// Function to filter hostels within the given range from the user's location
function filterHostelsByRange(userLat, userLon, hostels, range) {
  return hostels.filter(hostel => {
    const distance = haversineDistance(userLat, userLon, hostel.latitude, hostel.longitude);
    return distance <= range; // Only include hostels within the range
  });
}

// Function to create a new distance matrix based on filtered hostels
function createDistanceMatrix(filteredHostels) {
  const distanceMatrix = [];
  for (let i = 0; i < filteredHostels.length; i++) {
    const row = [];
    for (let j = 0; j < filteredHostels.length; j++) {
      if (i === j) {
        row.push(0); // Distance to itself is 0
      } else {
        const distance = haversineDistance(filteredHostels[i].latitude, filteredHostels[i].longitude, filteredHostels[j].latitude, filteredHostels[j].longitude);
        row.push(distance); // Distance between hostels i and j
      }
    }
    distanceMatrix.push(row);
  }
  return distanceMatrix;
}

// Function to calculate the distance between two clusters (using the minimum distance between them)
function calculateClusterDistance(clusterA, clusterB, distanceMatrix) {
  let minDistance = Infinity;
  for (let i = 0; i < clusterA.length; i++) {
    for (let j = 0; j < clusterB.length; j++) {
      const hostelA = clusterA[i];
      const hostelB = clusterB[j];
      const distance = distanceMatrix[hostelA.index][hostelB.index];
      if (distance < minDistance) {
        minDistance = distance;
      }
    }
  }
  return minDistance;
}

// Modified hierarchical clustering based on user location and hostel proximity
function hierarchicalClusteringWithUserLocation(userLat, userLon, hostels, range, threshold) {
  // Step 1: Filter hostels within the range from the user's location
  const filteredHostels = filterHostelsByRange(userLat, userLon, hostels, range);

  // If no hostels are within range, return an empty array
  if (filteredHostels.length === 0) return [];

  // Step 2: Create a distance matrix for the filtered hostels
  filteredHostels.forEach((hostel, index) => {
    hostel.index = index; // Assigning index to each hostel for reference in the distance matrix
  });

  const distanceMatrix = createDistanceMatrix(filteredHostels);

  // Step 3: Apply hierarchical clustering using the new distance matrix
  const clusters = filteredHostels.map((hostel) => [hostel]); // Initially, each hostel is its own cluster

  while (true) {
    let minDistance = Infinity;
    let pairToMerge = null;

    // Find the closest pair of clusters
    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        const distance = calculateClusterDistance(clusters[i], clusters[j], distanceMatrix);
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

// Controller function to handle clustering request
exports.getClusters = async (req, res) => {
  try {
    const threshold = parseFloat(req.query.threshold) || 1; // Default threshold = 1 km
    const userLat = parseFloat(req.query.userLat);
    const userLon = parseFloat(req.query.userLon);
    const range = parseFloat(req.query.range) || 5; // Default range = 5 km
    const clusterBy = req.query.clusterBy || "distance"; // Can be "distance" or "address"

    const data = await Shortestpath.find();

    if (data.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    if (clusterBy === "address") {
      const cityClusters = clusterByCity(data);
      return res.json({ clusters: cityClusters });
    } else if (clusterBy === "distance" && userLat && userLon) {
      const clusters = hierarchicalClusteringWithUserLocation(userLat, userLon, data, range, threshold);
      return res.json({ clusters });
    }

    res.status(400).json({ message: "Invalid clustering option or parameters" });
  } catch (error) {
    console.error("Error in getClusters:", error);
    res.status(500).json({ message: "Error clustering data", error });
  }
};
