function calculateGoldValue() {

    // Get input values
    var inputWeight = document.getElementById("weightInput").value;
    var pricePerBhori = parseFloat(document.getElementById("priceInput").value);

    // Validate input
    try {
        validateInput(inputWeight);
    } catch (error) {
        document.getElementById("display").value = "Error: " + error.message;
        return;
    }

    // Calculate the total value of the gold
    var totalValue = calculateGoldValueHelper(inputWeight, pricePerBhori);

    // Display the result
    document.getElementById("display").value = totalValue.toFixed(2);
}

function validateInput(inputWeight) {
    var parts = inputWeight.split(".");
    var weightInAna = parseFloat(parts[1]);
    var weightInRoti = parseFloat(parts[2]);
    var weightInPoint = parseFloat(parts[3]);

    if (weightInAna > 15 || weightInRoti > 5 || weightInPoint > 9) {
        throw new Error("Please Correct Weight!");
    }
}

function calculateGoldValueHelper(inputWeight, pricePerBhori) {
    // Split the input string into bhori, ana, roti, and point
    var parts = inputWeight.split(".");

    // Convert each part to its respective value
    var weightInBhori = parseFloat(parts[0]);
    var weightInAna = parseFloat(parts[1]);
    var weightInRoti = parseFloat(parts[2]);
    var weightInPoint = parseFloat(parts[3]);

    // Calculate the total weight in points
    var totalWeightInPoints = weightInBhori * 16 * 6 * 10 + weightInAna * 6 * 10 + weightInRoti * 10 + weightInPoint;

    // Calculate the total value of the gold
    return totalWeightInPoints * (pricePerBhori / (16 * 6 * 10));
}