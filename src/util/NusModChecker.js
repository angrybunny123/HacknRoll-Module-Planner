import axios from "../axios.js";

const getUserData = () => console.log("user data");

export const checkPrereq = (modType, moduleCode) => {
    axios
        .get(`${modType}/${moduleCode}.json`)
        .then((res) => res.data.prerequisites)
        .then((prerequisites) => {
            if (typeof prerequisites === "string") {
                return true;
            }

            const prereqArr = Object.keys(prerequisites);

            prereqArr.forEach((element) => {
                // check with user data

                // check for OR
                if (element.search("-") !== -1) {
                    const arr = element.split("-");
                }

                // AND
                // loop through user data
            });
        })
        .catch((err) => console.log(err));
};
