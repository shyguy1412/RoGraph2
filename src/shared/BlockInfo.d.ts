export interface BlockInfo {
    category: string,
    blocks: {
        label: string,
        blockCode: string,
        returnType: string
    }[];
}
//TODO: Rename returnType to return?