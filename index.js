function calculateGoldValue() {
    // Get input values
    var inputWeight = document.getElementById("weightInput").value;
    var pricePerBhori = parseFloat(document.getElementById("priceInput").value);
    var laborCostPerBhori = parseFloat(document.getElementById("laborCostInput").value);

    // Validate input
    try {
        if (!inputWeight || isNaN(pricePerBhori) || isNaN(laborCostPerBhori)) {
            throw new Error("Check Inputs!");
        }

        validateInput(inputWeight);

        if (parseFloat(inputWeight) < 0 || pricePerBhori < 0) {
            throw new Error("Invalid Inputs!");
        }
    } catch (error) {
        document.getElementById("display").value = "Error: " + error.message;
        document.getElementById("totalWeightInGram").value = "Error: " + error.message;
        document.getElementById("costPerGram").value = "Error: " + error.message;
        return;
    }

    // Calculate the total value of the gold
    var totalValue = calculateGoldValueHelper(inputWeight, pricePerBhori, laborCostPerBhori);

    // Calculate and display total weight in grams
    var totalWeightInGrams = convertToGrams(inputWeight);

    // Calculate cost per gram
    var calculatedCostPerGram = costPerGram(inputWeight, pricePerBhori);

    // Display the result
    document.getElementById("display").value = totalValue.toFixed(4);
    document.getElementById("totalWeightInGram").value = totalWeightInGrams.toFixed(4);
    document.getElementById("costPerGram").value = calculatedCostPerGram.toFixed(4);
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

function calculateGoldValueHelper(inputWeight, pricePerBhori, laborCostPerBhori) {
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
    return totalWeightInPoints * ((pricePerBhori + laborCostPerBhori) / (16 * 6 * 10));
}

function convertToGrams(inputWeight) {
    // Split the input string into bhori, ana, roti, and point
    var parts = inputWeight.split(".");

    // Convert each part to its respective value
    var weightInBhori = parseFloat(parts[0]);
    var weightInAna = parseFloat(parts[1]);
    var weightInRoti = parseFloat(parts[2]);
    var weightInPoint = parseFloat(parts[3]);

    // Calculate the total weight in grams
    var totalWeightInGrams = weightInBhori * 11.6638 + (weightInAna * 11.6638) / 16 + (weightInRoti * 11.6638) / 96 + (weightInPoint * 11.6638) / 960;

    return totalWeightInGrams;
}

function costPerGram(inputWeight, pricePerBhori) {
    var parts = inputWeight.split(".");

    // Convert each part to its respective value
    var weightInBhori = parseFloat(parts[0]);
    var weightInAna = parseFloat(parts[1]);
    var weightInRoti = parseFloat(parts[2]);
    var weightInPoint = parseFloat(parts[3]);

    // Calculate the total weight in points
    var totalWeightInPoints = weightInBhori * 16 * 6 * 10 + weightInAna * 6 * 10 + weightInRoti * 10 + weightInPoint;

    // Calculate the total weight in grams
    var totalWeightInGrams = weightInBhori * 11.6638 + (weightInAna * 11.6638) / 16 + (weightInRoti * 11.6638) / 96 + (weightInPoint * 11.6638) / 960;

    // Calculate the total value of the gold
    return (totalWeightInPoints * ((pricePerBhori) / (16 * 6 * 10))) / totalWeightInGrams;
}
