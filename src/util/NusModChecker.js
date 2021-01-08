import axios from "../axios.js";

export const checkPrereq = (modType, moduleCode, moduleTaken) => {
    console.log(modType);
    console.log(moduleCode);
    console.log(moduleTaken);
    return axios
        .get(`${modType}/${moduleCode}.json`)
        .then((res) => res.data.prerequisites)
        .then((prerequisites) => {
            if (prerequisites === "none") {
                return true;
            }

            let canTake = false;
            const prereqArr = Object.keys(prerequisites);

            prereqArr.forEach((element) => {
                // check with user data

                // check for OR
                if (element.search("-") !== -1) {
                    console.log("hi im inside OR");
                    const arr = element.split("-");

                    arr.forEach((module, index) => {
                        moduleTaken.forEach((modTaken, i) => {
                            canTake = canTake || modTaken === module;
                        });
                    });
                }

                // AND
                // loop through user data
                console.log("hi im at AND");
                moduleTaken.forEach((modTaken, i) => {
                    console.log(modTaken);
                    console.log(element);
                    canTake = canTake && modTaken === element;
                });
            });
            console.log(canTake);
            return canTake;
        })
        .catch((err) => console.log(err));
};
