import For = require('./for');
import { Mixed, COUNTER } from "./interfaces/types";

// for using in browser uncomment bellow and run > npm run bundle

interface MyWindow extends Window {
    For : (mixed : Mixed) => COUNTER;
}
(<MyWindow>window).For = For;

