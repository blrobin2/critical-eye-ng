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
}
