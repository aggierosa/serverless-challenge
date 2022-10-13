import { dynamoDBClient } from "../model/index";
import TodoServerice from "./service";

const todoService = new TodoServerice(dynamoDBClient());
export default todoService;
