import test from 'ava';
import {program} from "./day02";

test('very simple program', (t) => {
    t.is(program([
        1, 9, 10, 3,
        2, 3, 11, 0,
        99,
        30, 40, 50], 4), 3 * 50);
});

test('simple program', (t) => {
    t.is(program([
        1, 9, 10, 3,
        2, 3, 11, 0,
        99,
        30, 40, 50], 0), 3500);
});
