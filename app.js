axios
  .get("https://www.themealdb.com/api/json/v1/1/random.php")
  .then((res) => {
    const meals = res.data.meals;

    if (meals) {
      const meal = meals[0];

      const mealContainer = document.querySelector(".RandomFood");
      const mealImage = mealContainer.querySelector("img");
      const mealName = mealContainer.querySelector("p");

      mealImage.src = meal.strMealThumb;
      mealName.textContent = meal.strMeal;

      const modal = document.getElementById("myModal");
      const ingredientsList = document.getElementById("ingredientsList");

      mealImage.addEventListener("click", function () {
        modal.style.display = "block";

        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          if (meal[`strIngredient${i}`]) {
            ingredients.push(
              `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
          } else {
            break;
          }
        }

        const ingredientsHTML = ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("");
        ingredientsList.innerHTML = ingredientsHTML;
      });

      const closeButton = document.querySelector(".close");
      closeButton.addEventListener("click", function () {
        modal.style.display = "none";
      });

      window.addEventListener("click", function (event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });
    } else {
      console.error("No meals found");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function handleSearch() {
    const SearchValue = document.getElementById("input-tag").value;

    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${SearchValue}`)
        .then((res) => {
            const section4 = document.querySelector(".section4");

            if (res.data.meals === null) {
                console.log("Invalid Category");
                section4.style.display = "none"; 
            } else {
                const mealsToShow = res.data.meals.slice(0, 5);
                const boxes = section4.querySelectorAll("div");

                mealsToShow.forEach((meal, index) => {
                    const box = boxes[index];

                    const img = box.querySelector("img");
                    const p = box.querySelector(".box-text");

                    img.src = meal.strMealThumb;
                    p.textContent = meal.strMeal;
                });

                section4.style.display = "flex"; 
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

document.getElementById("input-tag").addEventListener("keyup", function(event) {
    if (event.key === "Enter") { 
        handleSearch(); 
    }
});
