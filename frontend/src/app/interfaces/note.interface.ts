export interface Note {
    id: number;
    type: "note" | "trash";
    title: string;
    content: string;
    marked: boolean;
}
