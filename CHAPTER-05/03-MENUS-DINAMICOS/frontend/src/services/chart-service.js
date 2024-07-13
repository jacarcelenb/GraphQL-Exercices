const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue("--text-color");
const textColorSecondary = documentStyle.getPropertyValue(
  "--text-color-secondary"
);
const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

const getNamesPizzas = (data) => {
  let names = [];
  data.forEach((element) => {
    names.push(element.piz_name);
  });
  return names;
};

const getCaloriesPizzas = (data) => {
  let calories = [];
  data.forEach((element) => {
    calories.push(element.total_calories);
  });
  return calories;
};

const getNamesIngredients = (data) => {
  let names = [];
  data.forEach((element) => {
    names.push(element.ing_name);
  });
  return names;
};

const getCaloriesIngredients = (data) => {
  let calories = [];
  data.forEach((element) => {
    calories.push(element.ing_calories);
  });
  return calories;
};

const getBackgroundColor = (data) => {
  let backgroundColor = [];
  let changefirstColor = Math.floor(Math.random() * 255);
  let changeSecondColor = Math.floor(Math.random() * 155);
  let changeThirdColor = Math.floor(Math.random() * 55);
  for (let index = 0; index < data.length; index++) {
    changefirstColor += index;
    changeSecondColor += index;
    changeThirdColor += index;
    backgroundColor.push(
      `rgba(${changefirstColor},${changeSecondColor},${changeThirdColor}, 0.2)`
    );
  }
  return backgroundColor;
};

const getBorderColor = (data) => {
  let BorderColor = [];
  let changefirstColor = Math.floor(Math.random() * 255);
  let changeSecondColor = Math.floor(Math.random() * 155);
  let changeThirdColor = Math.floor(Math.random() * 55);
  for (let index = 0; index < data.length; index++) {
    changefirstColor += index;
    changeSecondColor += index;
    changeThirdColor += index;
    BorderColor.push(
      `rgba(${changefirstColor},${changeSecondColor},${changeThirdColor})`
    );
  }
  console.log(BorderColor);
  return BorderColor;
};

const getPizzasData = (data) => {
  return {
    labels: getNamesPizzas(data),
    datasets: [
      {
        label: "Numero de calorías",
        data: getCaloriesPizzas(data),
        backgroundColor: getBackgroundColor(data),
        borderColor: getBorderColor(data),
        borderWidth: 1,
      },
    ],
  };
};

const getIngredientsData = (data) => {
  return {
    labels: getNamesIngredients(data),
    datasets: [
      {
        label: "Numero de calorías",
        data: getCaloriesIngredients(data),
        backgroundColor: getBackgroundColor(data),
        borderColor: getBorderColor(data),
        borderWidth: 1,
      },
    ],
  };
};

const CharPizzaLine = (data) => {
  return {
    labels: getNamesPizzas(data),
    datasets: [
      {
        label: "N",
        data: getCaloriesPizzas(data),
        fill: false,
        borderColor: documentStyle.getPropertyValue("--blue-500"),
        tension: 0.4,
      },
    ],
  };
};

const configPizzaLine = () => {


  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

const optionsBar = () => {
  return {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
};

const optionsPieChart = () => {
  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: false,
        },
      },
    },
  };
};

const optionsDonutChart = () => {
  return {
    cutout: "60%",
  };
};

export {
  getPizzasData,
  getIngredientsData,
  optionsBar,
  optionsPieChart,
  optionsDonutChart,
  configPizzaLine,
  CharPizzaLine,
};
