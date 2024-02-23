document.addEventListener('DOMContentLoaded', function() {
    var totalCost = 0;

    function updateTotal(amount) {
        // Adjust and update the total cost display
        totalCost += amount;
        document.getElementById('totalSpent').innerText = `Total Spent: $${totalCost.toFixed(2)}`;
    }

    function calculateMulch() {
        const depthInInches = 2.5;
        const cubicFeetPerCubicYard = 27; // There are 27 cubic feet in one cubic yard
        var areaSize = parseFloat(document.getElementById('areaSize').value);
        var volumeCubicFeet = areaSize * (depthInInches / 12); // Convert depth to feet
        var volumeCubicYards = volumeCubicFeet / cubicFeetPerCubicYard;
        var mulchCost = volumeCubicYards * 50; // Assuming $50 per cubic yard of mulch
        updateTotal(mulchCost);
    }

    function displaySidingOptions() {
        var sidingSelection = document.getElementById('sidingOption').value;
        var price = sidingSelection === 'basic' ? 100 : sidingSelection === 'premium' ? 200 : 300;
        if (sidingSelection !== 'none') {
            updateTotal(price);
        }
    }

    function calculateWeedBarrier() {
        var areaSize = parseFloat(document.getElementById('areaSize').value);
        var weedBarrierSelection = document.getElementById('weedBarrier').value;
        var weedBarrierCost = weedBarrierSelection === 'yes' ? areaSize * 0.5 : 0; // $0.5 per square foot
        updateTotal(weedBarrierCost);
    }

    var flowerOptionsDiv = document.getElementById('flowerOptions');
    var flowers = [
        { name: 'Marigolds', image: 'https://example.com/rose.jpg', price: 6.82 },
        { name: 'Petunias', image: 'https://example.com/tulip.jpg', price: 8.60 },
        { name: 'Zinnias', image: 'https://example.com/sunflower.jpg', price: 8 },
        { name: 'Impatiens (red, purple, pink, white)', image: 'https://example.com/sunflower.jpg', price: 2.55 }
        { name: 'Begonias', image: 'https://example.com/sunflower.jpg', price: 5 }
        { name: 'Lavender ( large)', image: 'https://example.com/sunflower.jpg', price: 16.40 }
        { name: 'Coneflowers', image: 'https://example.com/sunflower.jpg', price: 8.40 }
        { name: 'Black-eyed Susans (Rudbeckia)', image: 'https://example.com/sunflower.jpg', price: 12.50 }
        { name: 'Sunflowers', image: 'https://example.com/sunflower.jpg', price: 5.50 }
        { name: 'SnapDragons', image: 'https://example.com/sunflower.jpg', price: 5.20 }
        { name: 'Geraniums', image: 'https://example.com/sunflower.jpg', price: 6 }
        { name: 'pansies', image: 'https://example.com/sunflower.jpg', price: 7 }
        { name: 'Dianthus(large)', image: 'https://example.com/sunflower.jpg', price: 15 }
        { name: 'Tulip(One plant)', image: 'https://example.com/sunflower.jpg', price: 1.78 }
    ];

    flowers.forEach(function(flower, index) {
        var div = document.createElement('div');
        var label = document.createElement('label');
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'flowers';
        input.value = flower.name;

        // Create and hide quantity input initially
        var quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.name = `${flower.name}_quantity`;
        quantityInput.value = 0;
        quantityInput.min = 0;
        quantityInput.style.display = 'none';

        input.addEventListener('change', function() {
            // Show or hide the quantity input based on checkbox
            quantityInput.style.display = input.checked ? 'inline' : 'none';
            calculateFlowerCost(flower.name, flower.price, quantityInput, input.checked);
        });

        label.appendChild(input);
        label.appendChild(document.createTextNode(` ${flower.name} - $${flower.price} each`));
        div.appendChild(label);
        div.appendChild(quantityInput);
        flowerOptionsDiv.appendChild(div);
    });

    function calculateFlowerCost(flowerName, flowerPrice, quantityInput, isChecked) {
        var quantity = parseInt(quantityInput.value, 10) || 0;
        var costAdjustment = isChecked ? flowerPrice * quantity : -flowerPrice * quantity;
        updateTotal(costAdjustment);
        quantityInput.addEventListener('input', function() {
            // Recalculate cost whenever the quantity changes
            var newQuantity = parseInt(quantityInput.value, 10) || 0;
            var newCostAdjustment = flowerPrice * newQuantity - (flowerPrice * quantity);
            quantity = newQuantity; // Update quantity to new value
            updateTotal(newCostAdjustment);
        });
    }

    document.getElementById('sidingOption').addEventListener('change', displaySidingOptions);
    document.getElementById('weedBarrier').addEventListener('change', calculateWeedBarrier);
    document.getElementById('mulchCalculator').querySelector('input[type="button"]').addEventListener('click', function() {
        totalCost = 0; // Reset total cost before recalculation
        calculateMulch();
        calculateWeedBarrier();
        // Trigger recalculation for selected flowers and their quantities
        document.querySelectorAll('input[type="checkbox"][name="flowers"]:checked').forEach(function(checkbox) {
            var flower = flowers.find(f => f.name === checkbox.value);
            var quantityInput = document.querySelector(`input[name="${flower.name}_quantity"]`);
            calculateFlowerCost(flower.name, flower.price, quantityInput, true);
        });
        // Recalculate siding options as part of the total cost
        displaySidingOptions();
    });
});
