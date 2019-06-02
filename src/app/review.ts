export interface Review {
    id: number;
    artist: string;
    album: string;
    spotifyId: string;
    artwork: string;
    dateListened: Date;
    description: string;
    href: string;
    rating: number;
    yearReleased: number;
}
