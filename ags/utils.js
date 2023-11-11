export function range(length, start = 1) {
    return Array.from({ length }, (_, i) => i + start);
}

export function substitute(collection, item) {
    return collection.find(([from]) => from === item)?.[1] || item;
}
