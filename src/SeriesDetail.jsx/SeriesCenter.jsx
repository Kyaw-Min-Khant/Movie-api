import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RightContainer from "./RightContainer";
const SeriesCenter = () => {
  const [text, setText] = useState([]);
  const [video, setVideo] = useState([]);
  const location = useLocation();
  const detailId = location?.state?.id;
  const [review, setReview] = useState([]);
  useEffect(() => {
    apiFetch(), movieFetch(), reviewFetch();
  }, [detailId]);
  const apiFetch = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${detailId}?api_key=a6af80b02b99c9fae32ba3c9259d4844&language=en-US`
    );
    const detailFetch = await data.json();
    setText(detailFetch);
  };
  const movieFetch = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${detailId}/videos?api_key=a6af80b02b99c9fae32ba3c9259d4844&language=en-US`
    );
    const detailsFetch = await data.json();
    const preVideo = detailsFetch?.results;
    setVideo(preVideo);
  };
  const reviewFetch = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${detailId}/reviews?api_key=a6af80b02b99c9fae32ba3c9259d4844&language=en-US&page=1`
    );
    const detailsFetch = await data.json();
    setReview(detailsFetch.results);
  };
  const trailer = video?.find((item) => item.type === "Trailer");
  const clip = video?.find((item) => item.type === "Teaser");
  const generateUrl = `https://www.youtube.com/embed/${trailer?.key}`;
  const clipUrl = `https://www.youtube.com/embed/${clip?.key}`;
  return (
    <div className=" overflow-hidden">
      <RightContainer
        {...text}
        clipUrl={clipUrl}
        userReview={review}
        generateUrl={generateUrl}
      />
    </div>
  );
};

export default SeriesCenter;