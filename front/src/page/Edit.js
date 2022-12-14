import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {editPost} from "../modules/board";

const Edit = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  // writer로 닉네임 가져오기
  const nickname = useSelector((state) => state.user.nickname);
  const postId = useSelector((state) => state.board.postId);

  // 입력되는 내용 input state에 정의(?)
  const [inputs, setInputs] = useState({
    postId: postId,
    title: "",
    content: "",
    writer: nickname,
    updatedAt: Date.now(),
  });

  // 입력 받은 내용 setInputs에 저장해서 변경되는 내용 감지
  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  // 글 작성 후 제출
  // dispatch 요청 발생하면 boardAction의 addPost함수 실행
  const submitHandler = () => dispatch(editPost({ ...inputs }, nav));

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-28">
        <label>작성자 : {nickname}</label>
        <label className="mt-4">제목</label>
        <input type="text" name="title" value={inputs.title} onChange={inputsHandler} className="border-[1px] border-black w-[50%]" />
        <label className="mt-4">내용</label>
        <textarea name="content" value={inputs.content} onChange={inputsHandler} className="border-[1px] border-black w-[50%] h-80" />
        <button onClick={submitHandler} className="justify-center items-center bg-[#816bff]/20 p-3 rounded-xl mt-4">
          수정하기
        </button>
      </div>
    </>
  );
};

export default Edit;
