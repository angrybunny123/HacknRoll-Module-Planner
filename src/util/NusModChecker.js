import axios from "../axios.js";

export const checkPrereq = (modType, moduleCode, moduleTaken) => {
    console.log(modType);
    console.log(moduleCode);
    console.log(moduleTaken);
    axios
        .get(`${modType}/${moduleCode}.json`)
        .then((res) => res.data.prerequisites)
        .then((prerequisites) => {
            if (prerequisites === "none") {
                console.log("hi prereq true");
                return true;
            }
            console.log("hi");

            let canTake = false;
            const prereqArr = Object.keys(prerequisites);

            prereqArr.forEach((element) => {
                // check with user data

                // check for OR
                if (element.search("-") !== -1) {
                    const arr = element.split("-");

                    arr.forEach((module, index) => {
                        moduleTaken.forEach((modTaken, i) => {
                            canTake = canTake || modTaken === module;
                        });
                    });
                }

                // AND
                // loop through user data
                moduleTaken.forEach((modTaken, i) => {
                    canTake = canTake && modTaken === element;
                });
            });

            return canTake;
        })
        .catch((err) => console.log(err));
};
