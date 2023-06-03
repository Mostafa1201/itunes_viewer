type ItuneResponseObject = {
    kind: string; // The kind of content returned by the search request.
    artistName: string;
    collectionName: string;
    trackName: string; // The name of the track, song, video, TV episode, and so on returned by the search request.
    trackViewUrl: string;
    previewUrl: string;
    collectionPrice: number;
    trackPrice: number;
    releaseDate: string;
    country: string;
    currency: string;
    primaryGenreName: string;
    contentAdvisoryRating: string;
    shortDescription: string;
    longDescription: string;
    [key: string]: any;
}

export default ItuneResponseObject;