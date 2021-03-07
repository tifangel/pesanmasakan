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
    if (isChecked) {
        console.log(value);
        for (var i = 0; i < original.length; i++) {
            if (value === "dist_lt1" && original[i].distance < 1) {
                current.push(original[i]);
            }else if (value === "dist_1_2" && original[i].distance >= 1 && original[i].distance < 2 ) {
                current.push(original[i]);
            }else if (value === "dist_2_5" && original[i].distance >= 2 && original[i].distance < 5 ) {
                current.push(original[i]);
            }else if (value === "dist_gt5" && original[i].distance >= 5) {
                console.log(original[i].distance);
            }
        };
    } else {
        for (var i = current.length-1; i >= 0; i--) {
            if (value === "dist_lt1" && current[i].distance < 1) {
                current.splice(i, 1);
            }else if (value === "dist_1_2" && current[i].distance >= 1 && current[i].distance < 2 ) {
                current.splice(i, 1);
            }else if (value === "dist_2_5" && current[i].distance >= 2 && current[i].distance < 5 ) {
                current.splice(i, 1);
            }else if (value === "dist_gt5" && current[i].distance >= 5) {
                current.splice(i, 1);
            }
        };
    }
    return current;
}

export function filterDay(value, original, current, isChecked) {
    console.log("warungs", original);
    return original;
}