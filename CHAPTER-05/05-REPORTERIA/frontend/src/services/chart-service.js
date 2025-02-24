const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue("--text-color");
const textColorSecondary = documentStyle.getPropertyValue(
  "--text-color-secondary"
);
const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

const colors = [
  "#FF5733", // Rojo anaranjado
  "#33FF57", // Verde
  "#3357FF", // Azul
  "#F39C12", // Naranja
  "#8E44AD", // Púrpura
  "#3498DB", // Azul claro
  "#E74C3C", // Rojo
  "#2ECC71", // Verde esmeralda
  "#1ABC9C", // Turquesa
  "#9B59B6", // Lila
  "#34495E", // Azul oscuro
  "#F1C40F", // Amarillo
  "#E67E22", // Naranja oscuro
  "#F1C407", // Blanco humo
  "#95A5A6", // Gris claro
];

const getColors = (data) => {
  let respColors = [];
  if (data !== undefined) {
    if (data.length === colors.length) {
      respColors = colors;
    } else if (data.length < colors.length) {
      for (let i = 0; i < data.length; i++) {
        respColors.push(colors[i]);
      }
    } else {
      let numberMissingColors = data.length - colors.length;
      let missingColors = [];
      for (let i = 0; i < numberMissingColors; i++) {
        missingColors.push(colors[i]);
      }
      respColors = [...colors, ...missingColors];
    }

  }

  return respColors;
};

const getNamesPizzas = (data) => {
  let names = [];
 if (data !== undefined) {
  data.forEach((element) => {
    names.push(element.piz_name);
  });
 }
  return names;
};

const getCaloriesPizzas = (data) => {
  let calories = [];
  if (data !== undefined) {
    data.forEach((element) => {
      calories.push(element.total_calories);
    });
  }
  return calories;
};

const getNamesIngredients = (data) => {
  let names = [];
  if (data !== undefined) {
    data.forEach((element) => {
      names.push(element.ing_name);
    });
  }
  return names;
};

const getCaloriesIngredients = (data) => {
  let calories = [];
if (data !== undefined) {
  data.forEach((element) => {
    calories.push(element.ing_calories);
  });
}
  return calories;
};

const getPizzasData = (data) => {
  return {
    labels: getNamesPizzas(data),
    datasets: [
      {
        label: "Numero de calorías",
        data: getCaloriesPizzas(data),
        backgroundColor: getColors(data),
        borderColor: getColors(data),
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
        backgroundColor: getColors(data),
        borderColor: getColors(data),
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
        label: "Calorías por Pizzas",
        data: getCaloriesPizzas(data),
        fill: true,
        borderColor: documentStyle.getPropertyValue("--blue-500"),
        tension: 0.4,
        backgroundColor: documentStyle.getPropertyValue("--blue-100"),
      },
    ],
  };
};

const CharIngredientLine = (data) => {
  return {
    labels: getNamesIngredients(data),
    datasets: [
      {
        label: "Calorías por Ingredientes",
        data: getCaloriesIngredients(data),
        fill: true,
        borderColor: documentStyle.getPropertyValue("--orange-500"),
        tension: 0.4,
        backgroundColor: documentStyle.getPropertyValue("--orange-100"),
      },
    ],
  };
};

const RadarChart = (data, ingredients) => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");

  return {
    labels: getNamesPizzas(data),
    datasets: [
      {
        label: "Pizzas",
        borderColor: documentStyle.getPropertyValue("--blue-400"),
        pointBackgroundColor: documentStyle.getPropertyValue("--blue-400"),
        pointBorderColor: documentStyle.getPropertyValue("--blue-400"),
        pointHoverBackgroundColor: textColor,
        pointHoverBorderColor: documentStyle.getPropertyValue("--blue-400"),
        data: getCaloriesPizzas(data),
      },
      {
        label: "Ingredientes",
        borderColor: documentStyle.getPropertyValue("--pink-400"),
        pointBackgroundColor: documentStyle.getPropertyValue("--pink-400"),
        pointBorderColor: documentStyle.getPropertyValue("--pink-400"),
        pointHoverBackgroundColor: textColor,
        pointHoverBorderColor: documentStyle.getPropertyValue("--pink-400"),
        data: getCaloriesIngredients(ingredients),
      },
    ],
  };
};

const PolarCharPizza = (data)=>{
  return {
      datasets: [
          {
              data: getCaloriesPizzas(data),
              backgroundColor:getColors(data),
              label: 'Pizzas'
          }
      ],
      labels: getNamesPizzas(data)
  };
}

const PolarOptions = ()=> {
  return {
    plugins: {
        legend: {
            labels: {
                color: textColor
            }
        }
    },
    scales: {
        r: {
            grid: {
                color: surfaceBorder
            }
        }
    }
};
}

const configRadarChart = () => {
  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      r: {
        grid: {
          color: textColorSecondary,
        },
      },
    },
  };
};

const configLine = () => {
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
  configLine,
  CharIngredientLine,
  CharPizzaLine,
  RadarChart,
  configRadarChart,
  PolarCharPizza,
  PolarOptions,
};
