export interface Extension {
    authors: {
        email: string,
        name: string
    }[],
    category: string,
    description: string,
    id: string,
    license: string,
    name: string,
    version: string,
    website: string,
    dependencies: {
        name: string,
        version: string,
        authors: {
            author: string,
            email: string
        }[]
        ,
        git: string,
        license: string
    }[]
    blocks: import('./BlockInfo').BlockInfo[]
}