export interface Review {
    id: string;
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
