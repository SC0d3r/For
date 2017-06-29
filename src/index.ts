import { Mixed, COUNTER } from './types';
import { For } from "./for";
interface MyWindow extends Window {
    For : (mixed : Mixed) => COUNTER;
}
(<MyWindow>window).For = For;
