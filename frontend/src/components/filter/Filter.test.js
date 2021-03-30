import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Filter from "./Filter";

let container = null;
let data = [
    { "id": 1, "nama": "Warung 0.5", "distance": 0.5, },
    { "id": 2, "nama": "Warung 1.5", "distance": 1.5, },
    { "id": 3, "nama": "Warung 3.5", "distance": 3.5, },
    { "id": 4, "nama": "Warung 7.0", "distance": 7.0, },
]

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Filter distance", () => {    
    var handleFilter = jest.fn((f, n) => {
        console.log("f", f.nama);
        console.log("n", n);
        if (n === 0) return "Full data";
        else return f[0].nama;
    });

    act(() => {
        render(<Filter original={data} current={data} onFilter={handleFilter}/>, container);
    });

    const filter = document.querySelector("[value=\"5_Infinity\"]");

    act(() => {
        filter.dispatchEvent(new MouseEvent("click", { bubbles: true}));
    });
    expect(handleFilter.mock.results[0].value).toBe("Warung 7.0");
});
 