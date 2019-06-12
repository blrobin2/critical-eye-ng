export interface Review {
    _id: string;
    artist: string;
    album: string;
    spotifyId: string;
    artwork: string;
    dateListened: Date;
    description: string;
    href: string;
    rating: number;
    yearReleased: string;
    createdBy?: string;
    createdByUser?: {
        _id: string,
        spotifyId: string,
        name: string
    };
}
