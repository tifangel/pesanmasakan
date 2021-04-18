export function filterPrice(activePrice) {
    return function(data) {
        if (activePrice.length <= 0) return true;

        for (var i = 0; i < activePrice.length; i++) {
            var param = activePrice[i].split("_").map(x => +x);
            if (data.harga >= param[0] && data.harga <= param[1]) return true;
        }
        return false;
    }
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
        if (data.distance === "N/A") return true;

        for (var i = 0; i < activeDist.length; i++) {
            var param = activeDist[i].split("_").map(x => +x);
            if (data.distance >= param[0] && data.distance <= param[1]) return true;
        }
        return false;
    }
}

export function filterDay(activeDay) {
    return function(data) {
        if (activeDay.length <= 0) return true;

        for (var i = 0; i < data.hari.length; i++) {
            if (activeDay.includes(data.hari[i])) return true;
        }
        return false;
    }
}