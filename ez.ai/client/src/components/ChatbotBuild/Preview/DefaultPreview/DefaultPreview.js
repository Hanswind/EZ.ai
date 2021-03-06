import React from "react";
import TextPreview from "./BasicPreview/TextPreview";
import ImagePreview from "./BasicPreview/ImagePreview";
import VideoPreview from "./BasicPreview/VideoPreview";
import AudioPreview from "./BasicPreview/AudioPreview";
import LocationPreview from "./BasicPreview/LocationPreview";
import FilePreview from "./BasicPreview/FilePreview";
import ListPreview from "./AdvancePreview/ListPreview";
import '../TelegramPreview/TelegramPreview.css';
const DefaultPreview = ({
  changeAvailableIcon,
  index,
  keywordObject,
  now,
  onDelete,
  setClickedMainInput,
  setKeywordObject,
  setVirtualKeyboard,
  setNow,
}) => {
  return (
    <>
      {keywordObject[index] && (
        <div className="main-keyword-title">
          KEYWORD: {keywordObject[index].keyword}
        </div>
      )}
      {keywordObject[index] &&
        keywordObject[index].contents.map((v, i) =>
          v.type === "text" ? (
            <TextPreview
              v={v}
              i={i}
              setClickedMainInput={setClickedMainInput}
              now={now}
              setNow={setNow}
              onDelete={onDelete}
              changeAvailableIcon={changeAvailableIcon}
            />
          ) : v.type === "image" /**서버에서 파일 받아옴. */ ? (
            <ImagePreview
              v={v}
              i={i}
              setClickedMainInput={setClickedMainInput}
              now={now}
              setNow={setNow}
              onDelete={onDelete}
              changeAvailableIcon={changeAvailableIcon}
            />
          ) : v.type === "video" /**서버에서 파일 받아옴 */ ? (
            <VideoPreview
              v={v}
              i={i}
              setClickedMainInput={setClickedMainInput}
              now={now}
              setNow={setNow}
              onDelete={onDelete}
              changeAvailableIcon={changeAvailableIcon}
            />
          ) : v.type === "audio" ? (
            <AudioPreview
              v={v}
              i={i}
              setClickedMainInput={setClickedMainInput}
              now={now}
              setNow={setNow}
              onDelete={onDelete}
              changeAvailableIcon={changeAvailableIcon}
            />
          ) : v.type === "location" ? (
            <LocationPreview
              v={v}
              i={i}
              setClickedMainInput={setClickedMainInput}
              index={index}
              now={now}
              setNow={setNow}
              onDelete={onDelete}
              keywordObject={keywordObject}
              setKeywordObject={setKeywordObject}
              changeAvailableIcon={changeAvailableIcon}
            />
          ) : v.type === "file" ? (
            <FilePreview
              v={v}
              i={i}
              setClickedMainInput={setClickedMainInput}
              now={now}
              setNow={setNow}
              onDelete={onDelete}
              changeAvailableIcon={changeAvailableIcon}
            />
          ) : v.type === "list" ? (
            <ListPreview
              v={v}
              i={i}
              setVirtualKeyboard={setVirtualKeyboard}
              setClickedMainInput={setClickedMainInput}
              now={now}
              setNow={setNow}
              onDelete={onDelete}
              changeAvailableIcon={changeAvailableIcon}
            />
          ) : null)}
    </>
  )

};

export default DefaultPreview;