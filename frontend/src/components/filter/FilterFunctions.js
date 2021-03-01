export function filterPrice(value, original, current, isChecked) {
    console.log("warungs", original);
    return original;
}

export function filterCategory(value, original, current, isChecked) {
    if (isChecked) {
        for (var i = 0; i < original.length; i++) {
            if (original[i].kategori === value) {
                current.push(original[i]);
            }
        };
    } else {
        for (var i = current.length-1; i >= 0; i--) {
            if (current[i].kategori === value) {
                current.splice(i, 1);
            }
        };
    }
    return current;
}

export function filterDistance(value, original, current, isChecked) {
    console.log("warungs", original);
    return original;
}

export function filterDay(value, original, current, isChecked) {
    console.log("warungs", original);
    return original;
}