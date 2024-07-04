import "./reset.css";
import "./styles.css";

//COMMENTS AND NOTES
//I attempted to write unit tests but I don't think they are working properly
//The API takes a while to load and it sometimes glitches out when clicking buttons
//too fast when page first loads, images can take a long time to show up
//!!! If seach button doesn't work click the back button and reload the location
//the images of all the charaters should appear before the serach bar works

//The character's names are listed when the page for each location is clicked on
//The input for visions include: pyro, cryo, anemo, geo, electro, hydro
//The input for weapons include: bow, catalyst, polearm, claymore, sword

const input = document.querySelector("#input") as HTMLInputElement;
//const visionInput = document.querySelector('#visionInput') as HTMLInputElement;
const filterValue = document.querySelector("select") as HTMLSelectElement;
const searchButton = document.querySelector(
  "#searchButton"
) as HTMLButtonElement;
const resetButton = document.querySelector("#resetButton") as HTMLButtonElement;
const backButton = document.querySelector("#backButton") as HTMLButtonElement;
let location = "";

const list = document.querySelector("#infoList") as HTMLUListElement;

let mondstadtChara = new Array();
let inazumaChara = new Array();
let liyueChara = new Array();
let sumeruChara = new Array();
let fontaineChara = new Array();

type queryObject = {
  name?: string;
  vision?: string;
  weapon?: string;
};

const search = () => {
  reset();
  gatherInput();
};

const gatherInput = () => {
  let query: queryObject = {};

  if (filterValue.value == "characterName") {
    query = {
      name: input.value.toLowerCase(),
    };
  }
  if (filterValue.value == "vision") {
    query = {
      vision: input.value,
    };
  }
  if (filterValue.value == "weapon") {
    query = {
      weapon: input.value,
    };
  }
  if (filterValue.value == "none") {
    const h2 = document.createElement("h2");
    h2.innerHTML = "--Please choose a filter -";
    h2.style.color = "black";
    list.appendChild(h2);
  }

  performSearch(query);
};

export const performSearch = async (queryObject: {
  name?: string;
  vision?: string;
  weapon?: string;
}) => {
  if (queryObject.name) {
    characterNameSearch(queryObject);
  } else if (queryObject.vision) {
    visionSearch(queryObject);
  } else if (queryObject.weapon) {
    weaponSearch(queryObject);
  } else {
    const h2 = document.createElement("h2");
    h2.innerHTML = `- Please type an input`;
    h2.style.color = "black";
    list.appendChild(h2);
  }
};

const characterNameSearch = (queryObject: {
  name?: string;
  vision?: string;
  weapon?: string;
}) => {
  let url = "https://genshin.jmp.blue/characters/";
  if (mondstadt) {
    for (let i = 0; i < mondstadtChara.length; i++) {
      if (queryObject.name == mondstadtChara[i].name) {
        url = url + queryObject.name;
      }
    }
  }
  if (liyue) {
    for (let i = 0; i < liyueChara.length; i++) {
      if (queryObject.name == liyueChara[i].name) {
        url = url + queryObject.name;
      }
    }
  }
  if (inazuma) {
    for (let i = 0; i < inazumaChara.length; i++) {
      if (queryObject.name == inazumaChara[i].name) {
        url = url + queryObject.name;
      }
    }
  }
  if (sumeru) {
    for (let i = 0; i < sumeruChara.length; i++) {
      if (queryObject.name == sumeruChara[i].name) {
        url = url + queryObject.name;
      }
    }
  }
  if (fontaine) {
    for (let i = 0; i < fontaineChara.length; i++) {
      if (queryObject.name == fontaineChara[i].name) {
        url = url + queryObject.name;
      }
    }
  }
  const request = new Request(url);
  try {
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        processData(data);
      });
  } catch {
    errorMsg();
  }
};

const errorMsg = () => {
  infoList.replaceChildren();
  console.log("WORKING");
  const h2 = document.createElement("h2");
  h2.innerHTML = `Input does not exist`;
  h2.style.color = "black";
  list.appendChild(h2);
};

const visionSearch = (queryObject: { vision?: string }) => {
  //Check for case sensitive input
  if (queryObject.vision) {
    queryObject.vision =
      queryObject.vision?.charAt(0).toUpperCase() +
      queryObject.vision?.slice(1);
  }

  //if clicked on one location, then only show characters with input vision in that location
  if (location == "mondstadt") {
    let requestList = new Array();
    for (let i = 0; i < mondstadtChara.length; i++) {
      let url = "https://genshin.jmp.blue/characters/";
      if (queryObject.vision == mondstadtChara[i].vision) {
        url = url + mondstadtChara[i].name;
        const request = new Request(url);
        requestList.push(request);
      }
    }
    if (requestList.length == 0) {
      errorMsg();
    }
    for (let i = 0; i < requestList.length; i++) {
      fetch(requestList[i])
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          processData(data);
        });
    }
  }
  if (location == "liyue") {
    let requestList = new Array();
    for (let i = 0; i < liyueChara.length; i++) {
      let url = "https://genshin.jmp.blue/characters/";
      if (queryObject.vision == liyueChara[i].vision) {
        url = url + liyueChara[i].name;
        const request = new Request(url);
        requestList.push(request);
      }
    }
    if (requestList.length == 0) {
      errorMsg();
    }
    for (let i = 0; i < requestList.length; i++) {
      fetch(requestList[i])
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })

        .then((data) => {
          processData(data);
        });
    }
  }
  if (location == "inazuma") {
    let requestList = new Array();
    for (let i = 0; i < inazumaChara.length; i++) {
      let url = "https://genshin.jmp.blue/characters/";
      if (queryObject.vision == inazumaChara[i].vision) {
        url = url + inazumaChara[i].name;
        const request = new Request(url);
        requestList.push(request);
      }
    }
    if (requestList.length == 0) {
      errorMsg();
    }
    for (let i = 0; i < requestList.length; i++) {
      fetch(requestList[i])
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })

        .then((data) => {
          processData(data);
        });
    }
  }
  if (location == "sumeru") {
    let requestList = new Array();
    for (let i = 0; i < sumeruChara.length; i++) {
      let url = "https://genshin.jmp.blue/characters/";
      if (queryObject.vision == sumeruChara[i].vision) {
        url = url + sumeruChara[i].name;
        const request = new Request(url);
        requestList.push(request);
      }
    }
    if (requestList.length == 0) {
      errorMsg();
    }
    for (let i = 0; i < requestList.length; i++) {
      fetch(requestList[i])
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })

        .then((data) => {
          processData(data);
        });
    }
  }
  if (location == "fontaine") {
    let requestList = new Array();
    for (let i = 0; i < fontaineChara.length; i++) {
      let url = "https://genshin.jmp.blue/characters/";
      if (queryObject.vision == fontaineChara[i].vision) {
        url = url + fontaineChara[i].name;
        const request = new Request(url);
        requestList.push(request);
      }
    }
    if (requestList.length == 0) {
      errorMsg();
    }
    for (let i = 0; i < requestList.length; i++) {
      fetch(requestList[i])
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })

        .then((data) => {
          processData(data);
        });
    }
  }
};

//Search for types of weapons
const weaponSearch = (queryObject: {
  name?: string;
  vision?: string;
  weapon?: string;
}) => {
  if (queryObject.weapon) {
    queryObject.weapon =
      queryObject.weapon?.charAt(0).toUpperCase() +
      queryObject.weapon?.slice(1);
  }
  let requestList = new Array();

  if (location == "mondstadt") {
    for (let i = 0; i < mondstadtChara.length; i++) {
      let url = "https://genshin.jmp.blue/characters/";
      if (queryObject.weapon == mondstadtChara[i].weapon) {
        url = url + mondstadtChara[i].name;
        const request = new Request(url);
        requestList.push(request);
      }
    }
    if (requestList.length == 0) {
      errorMsg();
    }
    for (let i = 0; i < requestList.length; i++) {
      fetch(requestList[i])
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })

        .then((data) => {
          processData(data);
        });
    }
  } else if (location == "liyue") {
    for (let i = 0; i < liyueChara.length; i++) {
      let url = "https://genshin.jmp.blue/characters/";
      if (queryObject.weapon == liyueChara[i].weapon) {
        url = url + liyueChara[i].name;
        const request = new Request(url);
        requestList.push(request);
      }
    }
    if (requestList.length == 0) {
      errorMsg();
    }
    for (let i = 0; i < requestList.length; i++) {
      fetch(requestList[i])
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })

        .then((data) => {
          processData(data);
        });
    }
  } else if (location == "inazuma") {
    for (let i = 0; i < inazumaChara.length; i++) {
      let url = "https://genshin.jmp.blue/characters/";
      if (queryObject.weapon == inazumaChara[i].weapon) {
        url = url + inazumaChara[i].name;
        const request = new Request(url);
        requestList.push(request);
      }
    }
    for (let i = 0; i < requestList.length; i++) {
      fetch(requestList[i])
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })

        .then((data) => {
          processData(data);
        });
    }
  } else if (location == "sumeru") {
    for (let i = 0; i < sumeruChara.length; i++) {
      let url = "https://genshin.jmp.blue/characters/";
      if (queryObject.weapon == sumeruChara[i].weapon) {
        url = url + sumeruChara[i].name;
        const request = new Request(url);
        requestList.push(request);
      }
    }
    if (requestList.length == 0) {
      errorMsg();
    }
    for (let i = 0; i < requestList.length; i++) {
      fetch(requestList[i])
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })

        .then((data) => {
          processData(data);
        });
    }
  } else if (location == "fontaine") {
    for (let i = 0; i < fontaineChara.length; i++) {
      let url = "https://genshin.jmp.blue/characters/";
      if (queryObject.weapon == fontaineChara[i].weapon) {
        url = url + fontaineChara[i].name;
        const request = new Request(url);
        requestList.push(request);
      }
    }
    if (requestList.length == 0) {
      errorMsg();
    }
    for (let i = 0; i < requestList.length; i++) {
      fetch(requestList[i])
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })

        .then((data) => {
          processData(data);
        });
    }
  }
};

//Collect all characters in game
const collectChara = async () => {
  let charaNames = new Array();
  let url = "https://genshin.jmp.blue/characters/";
  const request = new Request(url);
  try {
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })

      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          charaNames.push(data[i]);
        }
        loadInput(charaNames);
      });
  } catch {
    console.log("Did not load");
  }
};

//Load all the characters into their location array
const loadInput = async (charaList: string[]) => {
  for (let i = 0; i < charaList.length; i++) {
    let url = "https://genshin.jmp.blue/characters/";
    url = url + charaList[i];
    const request = new Request(url);
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })

      .then((data) => {
        if (data.nation == "Mondstadt") {
          mondstadtChara.push(data);
        }
        if (data.nation == "Inazuma") {
          inazumaChara.push(data);
        }
        if (data.nation == "Liyue") {
          liyueChara.push(data);
        }
        if (data.nation == "Sumeru") {
          sumeruChara.push(data);
        }
        if (data.nation == "Fontaine") {
          fontaineChara.push(data);
        }
      });
  }
};

//Creates the info on searched characters
const processData = async (data: Character) => {
  if (data.name) {
    const div = document.createElement("div");
    div.setAttribute("id", "#flexVertical");
    div.style.backgroundColor = "rgba(0,0,0,0.3)";
    div.style.padding = "1.2vw";
    div.style.margin = "1vw";
    const h2Name = document.createElement("h2");
    const liVision = document.createElement("li");
    const liBirthday = document.createElement("li");
    const liRarity = document.createElement("li");
    const liWeapon = document.createElement("li");

    const img = document.createElement("img");

    list.appendChild(div);
    div.appendChild(h2Name);
    h2Name.innerHTML = `${data.name}`;
    div.appendChild(liVision);
    liVision.innerHTML = `Vision: ${data.vision}`;
    div.appendChild(liBirthday);
    let date = data.birthday.slice(5, 9);
    liBirthday.innerHTML = `Birthday: ${date}`;
    div.appendChild(liRarity);
    liRarity.innerHTML = `Rarity: ${data.rarity} stars`;
    div.appendChild(liWeapon);
    liWeapon.innerHTML = `Weapon: ${data.weapon}`;

    div.appendChild(img);
    data.name = data.name.toLowerCase();
    img.src = `https://genshin.jmp.blue/characters/${data.name}/card`;
  } else {
    const h2Error = document.createElement("li");
    h2Error.innerHTML = "Does not exist";
    h2Error.style.color = "black";
    list.appendChild(h2Error);
  }
};

//Displaying data
let mondstadt = document.querySelector("#mondstadt") as HTMLElement;
let liyue = document.querySelector("#liyue") as HTMLElement;
let inazuma = document.querySelector("#inazuma") as HTMLElement;
let sumeru = document.querySelector("#sumeru") as HTMLElement;
let fontaine = document.querySelector("#fontaine") as HTMLElement;

let homePage = document.querySelector("#homePage") as HTMLElement;
let body = document.querySelector("body") as HTMLElement;
let infoPage = document.querySelector("#infoPage") as HTMLElement;
let infoList = document.querySelector("#infoList") as HTMLElement;

//Event Listeners for selectLocation clicked
mondstadt.addEventListener("click", () => {
  reset();
  location = "mondstadt";
  homePage.style.display = "none";
  infoPage.style.display = "block";
  body.style.backgroundColor = "lightgreen";
  displayMon();
});

const displayMon = async () => {
  for (let i = 0; i < mondstadtChara.length; i++) {
    const div = document.createElement("div");
    div.setAttribute("id", "#flexVertical");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    h2.innerHTML = `${mondstadtChara[i].name}`;
    list.appendChild(div);
    div.appendChild(img);
    div.appendChild(h2);
    mondstadtChara[i].name = mondstadtChara[i].name.toLowerCase();
    img.src = `https://genshin.jmp.blue/characters/${mondstadtChara[i].name}/card`;
  }
};

liyue.addEventListener("click", () => {
  reset();
  location = "liyue";
  homePage.style.display = "none";
  infoPage.style.display = "block";
  body.style.backgroundColor = "brown";
  displayLiyue();
});

const displayLiyue = async () => {
  for (let i = 0; i < liyueChara.length; i++) {
    const div = document.createElement("div");
    div.setAttribute("id", "#flexVertical");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    h2.innerHTML = `${liyueChara[i].name}`;
    list.appendChild(div);
    div.appendChild(img);
    div.appendChild(h2);
    liyueChara[i].name = liyueChara[i].name.toLowerCase();
    let charaName = liyueChara[i].name.replace(" ", "-");
    img.src = `https://genshin.jmp.blue/characters/${charaName}/card`;
  }
};

inazuma.addEventListener("click", () => {
  reset();
  location = "inazuma";
  homePage.style.display = "none";
  infoPage.style.display = "block";
  body.style.backgroundColor = "purple";
  displayInazuma();
});

const displayInazuma = async () => {
  for (let i = 0; i < inazumaChara.length; i++) {
    const div = document.createElement("div");
    div.setAttribute("id", "#flexVertical");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    h2.innerHTML = `${inazumaChara[i].name}`;
    list.appendChild(div);
    div.appendChild(img);
    div.appendChild(h2);
    inazumaChara[i].name = inazumaChara[i].name.toLowerCase();
    let charaName = inazumaChara[i].name.replace(" ", "-");

    if (charaName.includes("kamisato")) {
      charaName = charaName.slice(9, charaName.length);
      inazumaChara[i].name = charaName;
    } else if (
      charaName.includes("kazuha") ||
      charaName.includes("kokomi" || charaName.includes("sara"))
    ) {
      charaName = charaName.split("-").pop();
    }
    img.src = `https://genshin.jmp.blue/characters/${charaName}/card`;
  }
};

sumeru.addEventListener("click", () => {
  reset();
  location = "sumeru";
  homePage.style.display = "none";
  infoPage.style.display = "block";
  body.style.backgroundColor = "darkgreen";
  displaySumeru();
});

const displaySumeru = async () => {
  for (let i = 0; i < sumeruChara.length; i++) {
    const div = document.createElement("div");
    div.setAttribute("id", "#flexVertical");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    h2.innerHTML = `${sumeruChara[i].name}`;
    list.appendChild(div);
    div.appendChild(img);
    div.appendChild(h2);
    sumeruChara[i].name = sumeruChara[i].name.toLowerCase();
    img.src = `https://genshin.jmp.blue/characters/${sumeruChara[i].name}/card`;
  }
};

fontaine.addEventListener("click", () => {
  reset();
  location = "fontaine";
  homePage.style.display = "none";
  infoPage.style.display = "block";
  body.style.backgroundColor = "blue";
  displayFontaine();
});

const displayFontaine = async () => {
  for (let i = 0; i < fontaineChara.length; i++) {
    const div = document.createElement("div");
    div.setAttribute("id", "#flexVertical");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    h2.innerHTML = `${fontaineChara[i].name}`;
    list.appendChild(div);
    div.appendChild(img);
    div.appendChild(h2);
    fontaineChara[i].name = fontaineChara[i].name.toLowerCase();
    img.src = `https://genshin.jmp.blue/characters/${fontaineChara[i].name}/card`;
  }
};

//Character interface for process data
interface Character {
  name: string;
  vision: string;
  weapon: string;
  nation: string;
  rarity: number;
  description: string;
  birthday: string;
}

const reset = () => {
  infoList.replaceChildren();
};

const resetInput = () => {
  reset();
  input.value = "";
  filterValue.value = "none";
  if (location == "mondstadt") {
    displayMon();
  } else if (location == "inazuma") {
    displayInazuma();
  }
};

const back = () => {
  homePage.style.display = "block";
  infoPage.style.display = "none";
  body.style.backgroundColor = "black";
};

if (searchButton) {
  searchButton.addEventListener("click", search);
}

if (resetButton) {
  resetButton.addEventListener("click", resetInput);
}

if (backButton) {
  backButton.addEventListener("click", back);
}

addEventListener("load", () => {});

onload = () => {
  reset();
  collectChara();
};
