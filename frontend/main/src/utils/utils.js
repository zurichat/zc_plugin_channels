import { createStandaloneToast } from "@chakra-ui/react";
import moment from "moment";

class UtilityService {
  constructor() {
    this.toast = createStandaloneToast();

    this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  }

  showAlert(title, description, status, duration) {
    if (!title || !description || !status || !duration) return;

    this.toast({
      title,
      description,
      status,
      duration,
      isClosable: true,
      position: "bottom-right",
    });
  }

  getFirstName(name) {
    return name.includes(" ") ? name.split(" ")[0] : name;
  }

  getLastName(name) {
    return name.includes(" ") ? name.split(" ")[0] : name;
  }

  dateFromNow(date) {
    return moment(date).fromNow();
  }

  formatDate(date, type) {
    return moment(date).format(type);
  }

  removeDuplicateObjectFromArray(array, key) {
    return array.filter((obj, index, self) =>
        index === self.findIndex((el) => (
            el[key] === obj[key]
        ))
    )
}
}

const instance = new UtilityService();

export default instance;
