import React, { useRef, useState } from "react";
import axios from "axios";
import produce from "immer";

const VideoStatus = ({ setKeywordObject, keywordObject, now, index }) => {
  const [videoName, setVideoName] = useState(null);
  const [uploading, setUploading] = useState(false);

  const videoRef = useRef();
  const onClickUploadVideo = () => {
    videoRef.current.click();
  };
  const onChangeVideo = async (e) => {
    if (e.target.value === "") return;
    if (e.target.files[0].type.match(/video/g)) {
      if (e.target.files[0].size < 20000000) {
        setUploading(true);
        const videoFormData = new FormData();
        videoFormData.append("video", e.target.files[0]);

        await axios.post("/api/video", videoFormData).then((res) => {
          setVideoName(res.data.originalname);
          setKeywordObject(
            produce(keywordObject, (draft) => {
              draft[index].contents[now].content = res.data.location;
              draft[index].contents[now].filepath = res.data.location;
            })
          );
        });
        setUploading(false);
      } else {
        return alert("비디오의 크기는 최대 20mb를 초과할수 없습니다");
      }
    } else return alert("비디오 파일이 아닙니다.");
  };
  return (
    <>
      <div className="status-video upload">
        <div className="status-input status-upload">
          <div className="upload-preview">
            <div
              className="preview-screen upload-preview-screen cursor"
              onClick={onClickUploadVideo}
              title="로컬 동영상 업로드"
            >
              {uploading ? (
                <p>파일 업로딩중...</p>
              ) : (
                videoName || (
                  <>
                    <i className="fas fa-upload"></i>
                    <div className="preview-screen-description">
                      파일 업로드
                    </div>
                  </>
                )
              )}
            </div>
            <input ref={videoRef} type="file" hidden onChange={onChangeVideo} />
          </div>
          <div className="caution">
            <p>파일 형식: MP4, M4V, MOV, AVI, WMV</p>
            <p>최대 파일 크기 : 20MB</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoStatus;
