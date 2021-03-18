export function filterPrice(value, original, current, isChecked) {
    console.log("warungs", original);
    return original;
}

export function filterCategory(activeCat) {
    return function(data) {
        if (activeCat.length <= 0) return true;

        return activeCat.includes(data.kategori);
    }
}

export function filterDistance(activeDist) {
    return function(data) {
        if (activeDist.length <= 0) return true;

        var passed = false;
        for (var i = 0; i < activeDist.length; i++) {
            var param = activeDist[i].split("_").map(x => +x);
            passed = data.distance >= param[0] && data.distance <= param[1];
            if (passed) return passed;
        }
        return passed;
    }
}

export function filterDay(value, original, current, isChecked) {
    console.log("warungs", original);
    return original;
}