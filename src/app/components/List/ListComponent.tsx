"use client";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { millisToMinutesAndSeconds } from "../../../utlities/time";
import ItuneTrackModel from "../../../../packages/core/src/types/ItuneTrackModel"

const renderLink = (params: GridRenderCellParams) => {
  return (
    <a style={{ color: "blue" }} href={params.value}>
      {params.value}
    </a>
  );
};

const ListComponent = ({tracks}: {tracks: ItuneTrackModel[]}) => {
  const [rows, setRows] = useState<ItuneTrackModel[]>([]);

  const columns: GridColDef[] = [
    { field: "index", headerName: "#", width: 50 },
    { field: "kind", headerName: "Kind", width: 80 },
    { field: "artistName", headerName: "Artist Name", width: 150 },
    { field: "collectionName", headerName: "Collection Name", width: 150 },
    { field: "trackId", headerName: "Track ID", width: 100 },
    { field: "trackName", headerName: "Track Name", width: 150 },
    {
      field: "trackViewUrl",
      headerName: "Track View URL",
      width: 350,
      renderCell: renderLink,
    },
    { field: "trackCount", headerName: "Track Count", width: 100 },
    { field: "trackPrice", headerName: "Track Price", width: 100 },
    { field: "trackTimeMillis", headerName: "Track time", width: 100 },
    {
      field: "previewUrl",
      headerName: "Preview URL",
      width: 350,
      renderCell: renderLink,
    },
    { field: "collectionPrice", headerName: "Collection Price", width: 150 },
    { field: "releaseDate", headerName: "Release Date", width: 200 },
    { field: "country", headerName: "Country", width: 120 },
    { field: "currency", headerName: "Currency", width: 100 },
    { field: "primaryGenreName", headerName: "Genre", width: 120 },
  ];

  useEffect(() => {
    const setData = async () => {
      const tableRows: ItuneTrackModel[] = tracks.map((track: ItuneTrackModel, index: number) => ({
        index: index + 1,
        id: track.id,
        kind: track.kind,
        artistName: track.artistName,
        collectionName: track.collectionName,
        trackId: track.trackId,
        trackName: track.trackName,
        trackViewUrl: track.trackViewUrl,
        trackCount: track.trackCount,
        trackPrice: track.trackPrice,
        trackTimeMillis: millisToMinutesAndSeconds(Number(track.trackTimeMillis)),
        previewUrl: track.previewUrl,
        collectionPrice: track.collectionPrice,
        releaseDate: track.releaseDate,
        country: track.country,
        currency: track.currency,
        primaryGenreName: track.primaryGenreName,
      }));
      setRows(tableRows);
    };
    if(tracks){
      setData();
    }
  }, [tracks]);

  return (
    <div className="listComponent">
      <div style={{ flex: 1 }}></div>
      <div style={{ flex: 8 }}>
        <Typography variant="h5" component="h3">
          Tracks
        </Typography>
        <DataGrid
          className="datagrid"
          rows={rows}
          columns={columns}
          editMode="row"
        />
      </div>
      <div style={{ flex: 1 }}></div>
    </div>
  );
};

export default ListComponent;
