import axios from "../axios.js";

const getUserData = () => console.log("user data");

export const checkPrereq = (modType, moduleCode, moduleTaken) => {
    axios
        .get(`${modType}/${moduleCode}.json`)
        .then((res) => res.data.prerequisites)
        .then((prerequisites) => {
            if (typeof prerequisites === "string") {
                return true;
            }

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
