const mysql =require("mysql2")

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'solution_challenge'
});

const ingredients = [
  { id: 1, name: "All-Purpose Flour", density: 0.57 },
  { id: 2, name: "Whole Wheat Flour", density: 0.59 },
  { id: 3, name: "Bread Flour", density: 0.61 },
  { id: 4, name: "Almond Flour", density: 0.40 },
  { id: 5, name: "Cornstarch", density: 0.54 },
  { id: 6, name: "Granulated Sugar", density: 0.85 },
  { id: 7, name: "Brown Sugar (packed)", density: 0.94 },
  { id: 8, name: "Powdered Sugar", density: 0.56 },
  { id: 9, name: "Honey", density: 1.42 },
  { id: 10, name: "Maple Syrup", density: 1.37 },
  { id: 11, name: "Butter (melted)", density: 0.91 },
  { id: 12, name: "Cocoa Powder", density: 0.50 },
  { id: 13, name: "Baking Powder", density: 0.80 },
  { id: 14, name: "Baking Soda", density: 2.20 },
  { id: 15, name: "Salt", density: 1.20 },
  { id: 16, name: "Milk", density: 1.03 },
  { id: 17, name: "Heavy Cream", density: 0.99 },
  { id: 18, name: "Yogurt", density: 1.03 },
  { id: 19, name: "Oil (Vegetable, Olive)", density: 0.92 },
  { id: 20, name: "Peanut Butter", density: 1.15 },
  { id: 21, name: "Oats (Rolled)", density: 0.40 },
  { id: 22, name: "Chopped Nuts (Walnuts, Almonds)", density: 0.48 },
  { id: 23, name: "Chocolate Chips", density: 0.65 },
  { id: 24, name: "Eggs (whole)", density: 1.03 }
];

const measurements = [
  { id: 1, size: "teaspoon", volume: 4.93 },
  { id: 2, size: "tablespoon", volume: 14.79 },
  { id: 3, size: "1/4 cup", volume: 59.15 },
  { id: 4, size: "1/3 cup", volume: 78.86 },
  { id: 5, size: "1/2 cup", volume: 118.29 },
  { id: 6, size: "2/3 cup", volume: 157.73 },
  { id: 7, size: "3/4 cup", volume: 177.44 },
  { id: 8, size: "cup", volume: 236.59 }
];

// const query = 'INSERT INTO ingredients (id, name, density) VALUES ?';
const query = 'INSERT INTO measurements (id, size, volume) VALUES ?';

const values = measurements.map(item => [item.id, item.size, item.volume])

// console.log(values);


try {
  connection.query(query, [values], (err, results) => {

    if (err) {
      console.log(err);
      return;
    }
    console.log(results);
  });
} 
catch (err) {
  console.log(err);
}
