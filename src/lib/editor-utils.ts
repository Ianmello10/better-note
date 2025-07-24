import type { Note } from "./db/db";


export function extractImages(notes: Note[])
    : string[] {
    const imageType = notes
        .filter((note) => note.type === 'image')
        .map((note) => note.content)
        .filter((src): src is string => typeof src === 'string');
    const allIamgesInsideNote = notes.flatMap((note) => {
        if (note.content) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(note.content, 'text/html');
            return Array.from(doc.querySelectorAll('img')).map((img) => img.src);
        }
        return [];
    });
    return [...imageType, ...allIamgesInsideNote];
}

