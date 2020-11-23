import { generalRequest } from "../../utilities";
import { url, port, entryPoint } from "./server";

const URL = `http://${url}:${port}`;

const resolvers = {
  Query: {
    getTeachers: (_) => {
      return generalRequest(`${URL}/teachers`, "GET");
    },
  },
};

export default resolvers;
