export interface IResults {
    info:    IInfo;
    results: IResult[];
}

export interface IInfo {
    count: number;
    pages: number;
    next:  string;
    prev:  string;
}

export interface IResult {
    id:       number;
    name:     string;
    status:   string;
    species:  string;
    type:     string;
    gender:   string;
    origin:   Location;
    location: Location;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
}

export interface Location {
    name: string;
    url:  string;
}