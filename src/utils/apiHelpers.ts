export function getStrapiURL(path = '') {
    return `http://localhost:1337${path}`;
}

export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }
    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }   
    return `${getStrapiURL()}${url}`;
}

export function formatDate(dateString: string  | Date) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export const delay = (time: number) => new Promise((resolve) => setTimeout(() => resolve(1), time));
