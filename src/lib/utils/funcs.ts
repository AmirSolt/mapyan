export function truncate(text: string, size: number, trailing: string = ' ...') {
    let subs = text.substring(0, size);
    if (subs.length < text.length) {
        subs += trailing;
    }
    return subs;
}