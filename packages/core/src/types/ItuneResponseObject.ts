type ItuneResponseObject = {
    kind: string; // The kind of content returned by the search request.
    artistName: string;
    collectionName: string;
    trackId: number;
    trackName: string; // The name of the track, song, video, TV episode, and so on returned by the search request.
    trackViewUrl: string;
    trackCount: number; // The number of tracks in the album.
    trackPrice: number;
    trackTimeMillis: number;
    previewUrl: string;
    collectionPrice: number;
    releaseDate: string;
    country: string;
    currency: string;
    primaryGenreName: string;
}

export default ItuneResponseObject;